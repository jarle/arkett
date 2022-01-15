import { Center, Container, HStack, Spinner, Text } from '@chakra-ui/react';
import React, { useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../state/AuthProvider';
import { CloudContext } from '../state/CloudSyncProvider';
import { EditorContentContext } from '../state/EditorContentProvider';
import StatusBar from './StatusBar';


export default function TextEditor() {
    const { content, setContent } = useContext(EditorContentContext)
    const { user } = useContext(AuthContext)
    const { scheduleAutosave } = useContext(CloudContext)

    const userRef = useRef()
    const editorRef = useRef()

    const saveHotkeyHandler = (event) => {
        if (event.ctrlKey && event.key === 's') {
            event.preventDefault()
            scheduleAutosave()
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', saveHotkeyHandler)

        return () => window.removeEventListener('keydown', saveHotkeyHandler)
    }, [])

    useEffect(() => {
        userRef.current = user
    }, [user])

    useEffect(() => {
        editorRef.current = require('./ConfiguredEditor').default
    })

    const handleChange = (content) => {
        setContent(content)
        scheduleAutosave()
    }

    function loadingSpinner() {
        return (
            <Center padding={'30'}>
                <HStack>
                    <Spinner label={"Loading editor"} />
                    <Text>Loading editor</Text>
                </HStack>
            </Center>
        )
    }

    return (
        <Center>
            <Container
                rounded={'18px'}
                opacity={'80%'}
                background={'white'}
                width={'80vw'}
                maxWidth={'60em'}
                maxHeight={'85vh'}
                overflow='auto'
                shadow={'lg'}
                padding={'8'}
                data-text-editor="arkett-editor"
            >
                {
                    editorRef.current ? (
                        <editorRef.current
                            value={content}
                            onChange={handleChange}
                        />
                    ) : loadingSpinner()
                }
                <StatusBar />
            </Container>

        </Center>
    )
}