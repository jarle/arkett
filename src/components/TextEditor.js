import { Center, Container, Fade, HStack, Spinner, Text, useToast, VStack } from '@chakra-ui/react';
import React, { useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../state/AuthProvider';
import { CloudContext } from '../state/CloudSyncProvider';
import { EditorContentContext } from '../state/EditorContentProvider';
import StatusBar from './StatusBar';


export default function TextEditor() {
    const { content, setContent } = useContext(EditorContentContext)
    const { user } = useContext(AuthContext)
    const { scheduleAutosave } = useContext(CloudContext)

    const editorRef = useRef()
    const toast = useToast()

    const saveHotkeyHandler = (event) => {
        if (event.ctrlKey && event.key === 's') {
            event.preventDefault()
            if (user) {
                scheduleAutosave()
            }
            else {
                toast({
                    description: "Please sign in to save your notes.",
                    isClosable: true
                })
            }
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', saveHotkeyHandler)

        return () => window.removeEventListener('keydown', saveHotkeyHandler)
    }, [])

    useEffect(() => {
        if (!editorRef.current) {
            editorRef.current = require('./ConfiguredEditor').default
        }
    }, [])

    const handleChange = (content) => {
        setContent(content)
        scheduleAutosave()
    }

    function loadingSpinner() {
        return (
            <Center padding={'30'}>
                <VStack>
                    <HStack>
                        <Spinner label={"Loading editor"} />
                        <Text>Loading editor</Text>
                    </HStack>
                    <Fade in >
                        <Text>Try refreshing the page if this takes too long</Text>
                    </Fade>
                </VStack>
            </Center>
        )
    }
    function showEditor() {
        return (
            <editorRef.current
                value={content}
                onChange={handleChange}
            />
        )
    }

    return (
        <Center>
            <Container
                rounded={'18px'}
                opacity={'80%'}
                background={'white'}
                width={['97vw', null, '80vw']}
                minWidth={'20em'}
                maxWidth={'60em'}
                maxHeight={'85vh'}
                overflow='auto'
                shadow={'lg'}
                padding={'8'}
                data-text-editor="arkett-editor"
            >
                {editorRef.current ? showEditor() : loadingSpinner()}
                <StatusBar />
            </Container>

        </Center>
    )
}