import { Center, Container, HStack, Spinner, Text } from '@chakra-ui/react';
import React, { useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../state/AuthProvider';
import { CloudContext } from '../state/CloudSyncProvider';
import { EditorContentContext } from '../state/EditorContentProvider';


export default function TextEditor() {
    const { content, setContent } = useContext(EditorContentContext)
    const { user } = useContext(AuthContext)
    const {scheduleAutosave} = useContext(CloudContext)

    const userRef = useRef()
    const editorRef = useRef()

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

    return (
        <Center>
            <Container
                rounded={'18px'}
                opacity={'80%'}
                style={{ background: 'white' }}
                width={'80vw'}
                maxWidth={'60em'}
                maxHeight={'85vh'}
                overflow='auto'
                shadow={'lg'}
            >
                {
                    editorRef.current ? (
                        <editorRef.current
                            value={content}
                            onChange={handleChange}
                        />
                    ) : loadingSpinner()
                }
            </Container>

        </Center>
    )

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
}