import { createContext, useState } from "react";

export const EditorContentContext = createContext<EditorContentContextInterface>(null)

interface EditorContentContextInterface {
    content: string
    setContent(content: string): void
}

export default function EditorContentProvider({ children }) {
    const [content, setContent] = useState<string>('')

    const exported: EditorContentContextInterface = {
        content,
        setContent
    }

    return (
        <EditorContentContext.Provider value={exported}>
            {children}
        </EditorContentContext.Provider>
    )
}