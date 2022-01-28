import { useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';

export default function ConfiguredEditor(props) {
    const quillRef = useRef()

    useEffect(() => {
        quillRef.current.focus()
        const editor = quillRef.current.getEditor()
        editor.setSelection(editor.getLength(), 0);
    }, [])

    return (
        <ReactQuill
            ref={quillRef}
            theme={'bubble'}
            bounds={`[data-text-editor="arkett-editor"]`}
            placeholder="Type something..."
            autofocus
            {...props}
        />
    )
}