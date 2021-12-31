import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { AuthContext } from "./AuthProvider";

export const EditorContentContext = createContext()

export default function EditorContentProvider({ children }) {
    const [content, setContent] = useState("")
    const { user } = useContext(AuthContext)

    useEffect(() => {
        if (user) {
            console.log("Fetching for ", user)
            supabase
                .from("content")
                .select()
                .eq('owner', user.id )
                .limit(1)
                .then(({ data }) => setContent(data[0].content))
        }
    }, [user])

    return (
        <EditorContentContext.Provider value={{ content, setContent }}>
            {children}
        </EditorContentContext.Provider>
    )
}