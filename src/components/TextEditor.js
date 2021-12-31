import { CKEditor } from '@ckeditor/ckeditor5-react';
import CustomEditor from 'ckeditor5-custom-build';
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../state/AuthProvider';
import { EditorContentContext } from '../state/EditorContentProvider';
import { supabase } from '../utils/supabaseClient';

export default function TextEditor() {
    const { content, setContent } = useContext(EditorContentContext)
    const { user } = useContext(AuthContext)

    const handleSave = editor => {
        if (user) {
            console.log("Synchronizing to cloud...")
            return supabase
                .from("content")
                .update({ "content": content })
                .match({ owner: user.id })
                .then(x => console.log("Synchronized"))
        }
    }

    const editor = (
        <CKEditor
            editor={CustomEditor}
            data={content}
            config={{
                autosave: {
                    save: handleSave
                }
            }}
            onChange={(event, editor) => {
                setContent(editor.getData())
            }}
        />
    )

    useEffect(() => {
        return () => editor?.editor?.destroy()
    })

    return editor
}