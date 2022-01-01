import { CKEditor } from '@ckeditor/ckeditor5-react';
import CustomEditor from 'ckeditor5-custom-build';
import React, { useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../state/AuthProvider';
import { EditorContentContext } from '../state/EditorContentProvider';
import '../styles/editorstyling.css';
import { supabase } from '../utils/supabaseClient';

export default function TextEditor() {
    const { content, setContent } = useContext(EditorContentContext)
    const { user } = useContext(AuthContext)
    const userRef = useRef()

    useEffect(() => {
        userRef.current = user
    }, [user])


    const handleSave = async editor => {
        if (userRef.current) {
            console.log("Synchronizing to cloud...")
            await supabase
                .from("content")
                .update({ "content": editor.getData() })
                .match({ owner: userRef.current.id });

            console.log("Synchronized");
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