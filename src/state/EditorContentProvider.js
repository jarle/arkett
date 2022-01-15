import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import useStickyState from "../utils/useStickyState";
import { AuthContext } from "./AuthProvider";
import { defaultContent } from "../utils/defaultContent"
import { NOT_SYNCED, SYNCHRONIZED, SYNCHRONIZING } from "../utils/syncStates";

export const EditorContentContext = createContext()

export default function EditorContentProvider({ children }) {
    const [content, setContent] = useStickyState(defaultContent, 'content')

    const setDefaultContent = () => {
        setContent(defaultContent)
    }

    const exported = {
        content,
        setContent,
        setDefaultContent
    }

    return (
        <EditorContentContext.Provider value={exported}>
            {children}
        </EditorContentContext.Provider>
    )
}