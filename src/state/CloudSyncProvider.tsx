import { nanoid } from "nanoid";
import { createContext, Dispatch, useContext, useEffect, useReducer, useRef } from "react";
import { defaultContent } from "../utils/defaultContent";
import { supabase } from "../utils/supabaseClient";
import { SYNC_STATE } from "../utils/syncStates";
import useStickyState from "../utils/useStickyState";
import { AuthContext } from "./AuthProvider";
import { EditorContentContext } from "./EditorContentProvider";

export const CloudContext = createContext<CloudContextInterface>(null)

export interface CloudContextInterface {
    syncState: string,
    lastSync: Date,
    cloudDispatch: Dispatch<any>,
    scheduleAutosave(): void,
    setDefaultContent(): void
}

export const actions = {
    TRIGGER_SYNC: "trigger_sync",
    REJECT_SYNC: "reject_sync",
    SYNCHRONIZE: "synchronize",
    SYNC_SUCCESS: "sync_success",
    CONTENT_CHANGED: "content_changed",
    SYNC_FAILURE: 'sync_failure',
    IS_STALE: "is_stale"
}

function cloudReducer(state, action) {
    console.debug(action)
    switch (action) {
        case actions.TRIGGER_SYNC:
            return {
                ...state,
                shouldSync: true
            }
        case actions.REJECT_SYNC:
            return {
                ...state,
                shouldSync: false,
                syncState: SYNC_STATE.SYNCHRONIZED
            }
        case actions.SYNCHRONIZE:
            return {
                ...state,
                syncState: SYNC_STATE.SYNCHRONIZING,
                shouldSync: false
            }
        case actions.SYNC_SUCCESS:
            return {
                ...state,
                syncState: SYNC_STATE.SYNCHRONIZED,
                lastSync: new Date(),
                shouldSync: false
            }
        case actions.CONTENT_CHANGED:
            return {
                ...state,
                syncState: SYNC_STATE.NOT_SYNCED,
                shouldSync: false
            }
        case actions.SYNC_FAILURE:
            return {
                ...state,
                syncState: SYNC_STATE.NOT_SYNCED,
                shouldSync: false
            }
        case actions.IS_STALE:
            return {
                ...state,
                syncState: SYNC_STATE.STALE,
                shouldSync: false
            }
        default:
            throw Error(`Unknown action ${action}, should be one of ${JSON.stringify(Object.values(actions))}`)
    }
}

interface CloudSyncInterface {
    syncState: SYNC_STATE
    lastEdit: Date
    lastSync: Date
    shouldSync: boolean
}

const initialState: CloudSyncInterface = {
    syncState: SYNC_STATE.NOT_SYNCED,
    lastEdit: undefined,
    lastSync: undefined,
    shouldSync: false
}

export default function CloudSyncProvider({ children }) {
    const { session, user } = useContext(AuthContext)
    const { content, setContent } = useContext(EditorContentContext)
    const [localContent, setLocalContent] = useStickyState(defaultContent, 'arkett_content')
    const observedIds = useRef([])

    const [cloudState, cloudDispatch] = useReducer(cloudReducer, initialState)
    const autosaverTimeout = useRef<NodeJS.Timeout>()

    const {
        syncState,
        lastEdit,
        lastSync,
        shouldSync
    } = cloudState;

    useEffect(() => {
        setContent(localContent)
        scheduleAutosave()
    }, [])

    useEffect(() => {
        const mySubscription = supabase
            .from('content')
            .on('*', (event) => {
                if (!observedIds.current.includes(event.new.nanoid)) {
                    console.log(observedIds)
                    console.log(event.new.nanoid)
                    cloudDispatch(actions.IS_STALE)
                }
            })
            .subscribe()

        return () => {
            mySubscription.unsubscribe()
        }
    }, [])


    const fetchFromRemote = async () => {
        if (user) {
            console.debug("Fetch latest from remote for " + user.email)
            cloudDispatch(actions.SYNCHRONIZE)
            const { data, error } = await supabase
                .from("content")
                .select()
                .eq('owner', user.id)
                .limit(1)

            if (error) {
                cloudDispatch(actions.SYNC_FAILURE)
                console.error(error)
                return
            }

            const newContent = data[0]?.content
            if (newContent) {
                observedIds.current.push(data[0].nanoid)
                setContent(newContent)
                cloudDispatch(actions.SYNC_SUCCESS)
            }
            else {
                console.debug("First login")
                if (localContent?.length) {
                    setContent(localContent)
                    scheduleAutosave()
                    await supabase
                        .from("content")
                        .insert({
                            owner: user.id,
                            content: localContent
                        });
                }
            }
        }
        else if (localContent?.length) {
            setContent(localContent)
        }
    }

    useEffect(() => {
        fetchFromRemote()
    }, [user, setContent])

    const handleAutoSave = async () => {
        if (shouldSync) {
            if (longTimeSinceLastSync()) {
                console.debug("Autosaving")
                cloudDispatch(actions.SYNCHRONIZE)
                setLocalContent(content)
                if (user) {
                    const nid = nanoid()
                    observedIds.current.push(nid)
                    const { error } = await supabase
                        .from("content")
                        .update({
                            "content": content,
                            "nanoid": nid
                        })
                        .match({ owner: user.id });
                }
                cloudDispatch(actions.SYNC_SUCCESS)
            }
            else {
                cloudDispatch(actions.REJECT_SYNC)
                scheduleAutosave()
            }
        }
    }

    useEffect(() => {
        handleAutoSave()
    }, [cloudState])

    const longTimeSinceLastSync = () => !lastSync || (new Date().getTime() - lastSync) > 2000

    const scheduleAutosave = () => {
        cloudDispatch(actions.CONTENT_CHANGED)
        if (autosaverTimeout.current) {
            clearTimeout(autosaverTimeout.current)
        }
        autosaverTimeout.current = setTimeout(() => {
            cloudDispatch(actions.TRIGGER_SYNC)
        }, 750)
    }

    const setDefaultContent = () => {
        setLocalContent(defaultContent)
    }

    const exported: CloudContextInterface = {
        syncState,
        lastSync,
        cloudDispatch,
        scheduleAutosave,
        setDefaultContent
    }

    return (
        <CloudContext.Provider value={exported} >
            {children}
        </CloudContext.Provider>
    )
}