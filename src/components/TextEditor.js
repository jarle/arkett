import { Center, Container, HStack, Spinner, Text } from '@chakra-ui/react';
import React, { useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../state/AuthProvider';
import { EditorContentContext } from '../state/EditorContentProvider';
import { supabase } from '../utils/supabaseClient';
import { SYNCHRONIZED, SYNCHRONIZING, NOT_SYNCED } from '../utils/syncStates';
import('@ckeditor/ckeditor5-theme-lark/theme/theme.css')

export default function TextEditor() {
    const { content, setContent, setSyncState } = useContext(EditorContentContext)
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
            //console.log(editorRef.current.CustomEditor.builtinPlugins.map(p => p.pluginName))
        }
    }, []);


    const handleSave = async editor => {
        if (userRef.current) {
            console.log("Synchronizing to cloud...")
            setSyncState(SYNCHRONIZING)
            await supabase
                .from("content")
                .update({ "content": editor.getData() })
                .match({ owner: userRef.current.id });

            console.log("Synchronized");
            setSyncState(SYNCHRONIZED)
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
                    setSyncState(NOT_SYNCED)
                    setContent(editor.getData())
                }}
            /> : (
                <Center padding={'30'}>
                    <HStack>
                        <Spinner label={"Loading editor"} />
                        <Text>Loading editor</Text>
                    </HStack>
                </Center>
            )
    )

    useEffect(() => {
        return () => {
            editor.editor?.destroy()
        }
    }, [editor?.editor])


    return (
        <Center>
            <Container
                rounded={'18px'}
                opacity={'80%'}
                style={{ background: 'white' }}
                marginLeft={'10'}
                marginRight={'10'}
                width={'80vw'}
                maxWidth={'60em'}
                minHeight={'85vh'}
                maxHeight={'85vh'}
                overflow={'auto'}
                shadow={'lg'}
            >
                {editor}
            </Container>

        </Center>
    )
}