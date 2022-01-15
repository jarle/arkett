import { HStack, Text } from "@chakra-ui/react"
import { useContext } from "react"
import { AuthContext } from "../state/AuthProvider"
import { CloudContext } from "../state/CloudSyncProvider"


export default function StatusBar() {
    const { syncState, lastSync } = useContext(CloudContext)
    const { session } = useContext(AuthContext)

    if (session) {
        return (
            <HStack >
                <Text
                    fontSize={'sm'}
                    color={'blackAlpha.500'}
                >
                    {syncState.description}
                    {lastSync && ` (last sync ${lastSync})`}
                </Text>
            </HStack>
        )
    }
    return null;
}