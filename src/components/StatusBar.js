import { HStack, Text } from "@chakra-ui/react"
import { useContext } from "react"
import { AuthContext } from "../state/AuthProvider"
import { EditorContentContext } from "../state/EditorContentProvider"


export default function StatusBar() {
    const { syncState } = useContext(EditorContentContext)
    const {session} =useContext(AuthContext)

    if (session) {
        return (
            <HStack >
                <Text
                    fontSize={'sm'}
                    color={'blackAlpha.500'}
                >
                    {syncState.description}
                </Text>
            </HStack>
        )
    }
    return null;
}