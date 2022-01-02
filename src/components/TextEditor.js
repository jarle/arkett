import React, { useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../state/AuthProvider';
import { EditorContentContext } from '../state/EditorContentProvider';
import { supabase } from '../utils/supabaseClient';

export default function TextEditor() {
    const { content, setContent } = useContext(EditorContentContext)
    const { user } = useContext(AuthContext)
    const userRef = useRef()

    const editorRef = useRef();
    const { CKEditor, CustomEditor } = editorRef.current || {};

    useEffect(() => {
        userRef.current = user
    }, [user])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            editorRef.current = {
                CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
                CustomEditor: require("ckeditor5-custom-build")
            };
        }
    }, []);


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
        CustomEditor ?
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
            /> : null
    )

    useEffect(() => {
        return () => {
            if (typeof editor === CKEditor) {
                editor.editor?.destroy()
            }
        }
    })

    return editor
}