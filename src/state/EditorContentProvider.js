import { createContext, useState } from "react";
import { defaultContent } from "../utils/defaultContent";

export const EditorContentContext = createContext()

export default function EditorContentProvider({ children }) {
    //const [content, setContent] = useStickyState(defaultContent, 'content')
    const [content, setContent] = useState('')

    const setDefaultContent = () => {
        console.log("Set default")
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