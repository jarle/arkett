import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import useStickyState from "../utils/useStickyState";
import { AuthContext } from "./AuthProvider";
import { defaultContent } from "../utils/defaultContent"
import { NOT_SYNCED, SYNCHRONIZED, SYNCHRONIZING } from "../utils/syncStates";

export const EditorContentContext = createContext()

export default function EditorContentProvider({ children }) {
    const [syncState, setSyncState] = useState(NOT_SYNCED)
    const [content, setContent] = useStickyState(defaultContent, 'content')
    const { user } = useContext(AuthContext)

    useEffect(() => {
        if (user) {
            console.log("Fetch latest from remote for " + user.email)
            setSyncState(SYNCHRONIZING)
            supabase
                .from("content")
                .select()
                .eq('owner', user.id)
                .limit(1)
                .then(({ data }) => setContent(data[0].content))
                .then(() => setSyncState(SYNCHRONIZED))
        }
    }, [user, user?.id, setContent])

    const setDefaultContent = () => {
        setContent(defaultContent)
    }

    return (
        <EditorContentContext.Provider value={{ content, setContent, setDefaultContent, syncState, setSyncState }}>
            {children}
        </EditorContentContext.Provider>
    )
}