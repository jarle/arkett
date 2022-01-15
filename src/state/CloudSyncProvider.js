import { createContext, useContext, useEffect, useReducer, useRef } from "react";
import { supabase } from "../utils/supabaseClient";
import { NOT_SYNCED, SYNCHRONIZED, SYNCHRONIZING } from "../utils/syncStates";
import { AuthContext } from "./AuthProvider";
import { EditorContentContext } from "./EditorContentProvider";

export const CloudContext = createContext()

export const actions = {
    TRIGGER_SYNC: "trigger_sync",
    REJECT_SYNC: "reject_sync",
    SYNCHRONIZE: "synchronize",
    SYNC_SUCCESS: "sync_success",
    CONTENT_CHANGED: "content_changed"
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
                syncState: SYNCHRONIZED
            }
        case actions.SYNCHRONIZE:
            return {
                ...state,
                syncState: SYNCHRONIZING,
                shouldSync: false
            }
        case actions.SYNC_SUCCESS:
            return {
                ...state,
                syncState: SYNCHRONIZED,
                lastSync: new Date(),
                shouldSync: false
            }
        case actions.CONTENT_CHANGED:
            return {
                ...state,
                syncState: NOT_SYNCED,
                shouldSync: false
            }
        default:
            throw Error(`Unknown action ${action}, should be one of ${JSON.stringify(Object.values(actions))}`)
    }
}

const initialState = {
    syncState: NOT_SYNCED,
    lastEdit: undefined,
    lastSync: undefined,
    shouldSync: false
}

export default function CloudSyncProvider({ children }) {
    const { session, user } = useContext(AuthContext)
    const { content, setContent,  setDefaultContent } = useContext(EditorContentContext)

    const [cloudState, cloudDispatch] = useReducer(cloudReducer, initialState)
    const autosaverTimeout = useRef()

    const {
        syncState,
        lastEdit,
        lastSync,
        shouldSync
    } = cloudState;

    const fetchFromRemote = async () => {
        if (user) {
            console.debug("Fetch latest from remote for " + user.email)
            cloudDispatch(actions.SYNCHRONIZE)
            const { data } = await supabase
                .from("content")
                .select()
                .eq('owner', user.id)
                .limit(1)

            await setContent(data[0].content)
            cloudDispatch(actions.SYNC_SUCCESS)
        }
        else {
            console.warn("No user")
            setDefaultContent()
        }
    }
    useEffect(fetchFromRemote, [user, user?.id, setContent])

    const handleAutoSave = async () => {
        if (shouldSync && user) {
            if (longTimeSinceLastSync()) {
                console.debug("Autosaving")
                cloudDispatch(actions.SYNCHRONIZE)
                await supabase
                    .from("content")
                    .update({ "content": content })
                    .match({ owner: user.id });

                cloudDispatch(actions.SYNC_SUCCESS)
                console.debug("Saved")
            } else {
                cloudDispatch(actions.REJECT_SYNC)
            }
        }
    }
    useEffect(handleAutoSave, [cloudState])

    const longTimeSinceLastSync = () => (new Date().getTime() - lastSync) > 2000

    const scheduleAutosave = () => {
        cloudDispatch(actions.CONTENT_CHANGED)
        if (autosaverTimeout.current) {
            clearTimeout(autosaverTimeout.current)
        }
        autosaverTimeout.current = setTimeout(() => {
            cloudDispatch(actions.TRIGGER_SYNC)
        }, 750)
    }


    const exported = {
        syncState,
        lastSync,
        cloudDispatch,
        scheduleAutosave
    }

    return (
        <CloudContext.Provider value={exported} >
            {children}
        </CloudContext.Provider>
    )


}