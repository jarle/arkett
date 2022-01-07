import { createContext, useContext, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import useStickyState from "../utils/useStickyState";
import { AuthContext } from "./AuthProvider";
import { defaultContent } from "./defaultContent"

export const EditorContentContext = createContext()

export default function EditorContentProvider({ children }) {
    const [content, setContent] = useStickyState(defaultContent, 'content')
    const { user } = useContext(AuthContext)

    useEffect(() => {
        if (user) {
            console.log("Fetch latest from remote for " + user.email)
            supabase
                .from("content")
                .select()
                .eq('owner', user.id)
                .limit(1)
                .then(({ data }) => setContent(data[0].content))
        }
    }, [user, user?.id, setContent])

    const setDefaultContent = () => {
        setContent(defaultContent)
    }

    return (
        <EditorContentContext.Provider value={{ content, setContent, setDefaultContent }}>
            {children}
        </EditorContentContext.Provider>
    )
}