import { createContext, useState } from "react";

export const EditorContentContext = createContext()

export default function EditorContentProvider({ children }) {
    const [content, setContent] = useState('')

    const exported = {
        content,
        setContent
    }

    return (
        <EditorContentContext.Provider value={exported}>
            {children}
        </EditorContentContext.Provider>
    )
}