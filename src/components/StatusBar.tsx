import { Circle, Flex, Icon, Tooltip } from "@chakra-ui/react"
import { useContext } from "react"
import { IoCheckmarkCircle, IoSyncCircle, IoWarning } from "react-icons/io5"
import { AuthContext } from "../state/AuthProvider"
import { CloudContext } from "../state/CloudSyncProvider"
import { SYNC_STATE } from "../utils/syncStates"

export default function StatusBar() {
    const { syncState, lastSync } = useContext(CloudContext)
    const { session } = useContext(AuthContext)

    const StatusIndicator = () => {
        if (!session) {
            return <Icon boxSize={'1.5em'} as={IoWarning} color={'orange'} />
        }
        switch (syncState) {
            case SYNC_STATE.NOT_SYNCED:
                return <Icon boxSize={'1.5em'} as={IoCheckmarkCircle} color={'gray'} />
            case SYNC_STATE.SYNCHRONIZING:
                return <Icon boxSize={'1.5em'} as={IoSyncCircle} color='blue.300' />
            case SYNC_STATE.SYNCHRONIZED:
                return <Icon boxSize={'1.5em'} as={IoCheckmarkCircle} color='green.300' />
            case SYNC_STATE.STALE:
                return <Icon boxSize={'1.5em'} as={IoWarning} color={'red'} />
            default:
                return null;
        }
    }

    const statusTooltip = () => {
        if (session) {
            return syncState
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