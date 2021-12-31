import { createContext, useContext, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import useStickyState from "../utils/useStickyState";
import { AuthContext } from "./AuthProvider";

export const EditorContentContext = createContext()

export default function EditorContentProvider({ children }) {
    const [content, setContent] = useStickyState("", 'content')
    const { user } = useContext(AuthContext)

    useEffect(() => {
        if (user) {
            supabase
                .from("content")
                .select()
                .eq('owner', user.id )
                .limit(1)
                .then(({ data }) => setContent(data[0].content))
        }
    }, [user, user?.id, setContent])

    return (
        <EditorContentContext.Provider value={{ content, setContent }}>
            {children}
        </EditorContentContext.Provider>
    )
}