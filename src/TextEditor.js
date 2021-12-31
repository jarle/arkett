import React, { useContext, useEffect, useRef } from 'react';
import { AuthContext } from './state/AuthProvider';
import { EditorContentContext } from './state/EditorContentProvider';
import { supabase } from './supabaseClient';

export default function TextEditor() {
    const { content } = useContext(EditorContentContext)
    const { user } = useContext(AuthContext)
    const editor = useRef()
    const { CKEditor, CustomEditor } = editor.current || {}

    const handleSave = editor => {
        return supabase
            .from("content")
            .update({ "content": editor.getData() })
            .match({ owner: user.id })
            .then(x => console.log("Saved"))
    }

    console.log("Textediridosg")

    useEffect(
        () => {
            const CKEditor = require('@ckeditor/ckeditor5-react').CKEditor;
            const CustomEditor = require('ckeditor5-custom-build');
            editor.current = {
                CKEditor,
                CustomEditor
            }
        })

    return editor.current ?
        <CKEditor
            editor={CustomEditor}
            data={content}
            config={{
                autosave: {
                    save: handleSave
                }
            }}
            onBlur={(event, editor) => {
                handleSave(editor);
            }}
            onFocus={(event, editor) => {
            }}
        />
        : <div>Fetching data...</div>
}