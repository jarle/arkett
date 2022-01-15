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
        switch (syncState) {
            case NOT_SYNCED:
                return <Icon boxSize={'1.5em'} as={IoWarning} color={session? 'gray' : 'orange'} />
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
        return "Content not backed up to the cloud. Log in to avoid losing changes."
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