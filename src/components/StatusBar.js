import { Circle, Flex, Icon, Tooltip } from "@chakra-ui/react"
import { useContext } from "react"
import { IoCheckmarkCircle, IoSyncCircle, IoWarning } from "react-icons/io5"
import { AuthContext } from "../state/AuthProvider"
import { CloudContext } from "../state/CloudSyncProvider"
import { NOT_SYNCED, SYNCHRONIZED, SYNCHRONIZING } from "../utils/syncStates"


export default function StatusBar() {
    const { syncState, lastSync } = useContext(CloudContext)
    const { session } = useContext(AuthContext)

    const StatusIndicator = () => {
        if (!session) {
            return <Icon boxSize={'1.5em'} as={IoWarning} color={'orange'} />
        }
        switch (syncState) {
            case NOT_SYNCED:
                return <Icon boxSize={'1.5em'} as={IoCheckmarkCircle} color={'gray'} />
            case SYNCHRONIZING:
                return <Icon boxSize={'1.5em'} as={IoSyncCircle} color='blue.300' />
            case SYNCHRONIZED:
                return <Icon boxSize={'1.5em'} as={IoCheckmarkCircle} color='green.300' />
            default:
                break;
        }
    }

    const statusTooltip = () => {
        if (session) {
            return syncState.description
        }
        return "Not logged in. Content is not synchronized to the cloud."
    }

    return (
        <Flex width={'100%'} flexDirection='column' alignItems={'flex-end'}>
            <Tooltip
                label={statusTooltip()}
                placement={'top'}
                rounded='xl'
                background='blackAlpha.700'
            >
                <Circle
                    background='white'
                    opacity={session ? '0.7' : '1'}
                    _hover={{
                        opacity: '1'
                    }}>
                    <StatusIndicator />
                </Circle>
            </Tooltip>
        </Flex>
    )
}