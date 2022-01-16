import { Box, Button, Container, HStack, Icon, Input, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Portal, Text, Textarea, Tooltip, useRadio, useRadioGroup, useToast, VStack } from '@chakra-ui/react'
import { useContext, useRef, useState } from 'react'
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdOutlineClose, MdOutlineFeedback } from 'react-icons/md'
import { AuthContext } from '../state/AuthProvider'

function RadioCard(props) {
    const { getInputProps, getCheckboxProps } = useRadio(props)

    const input = getInputProps()
    const checkbox = getCheckboxProps()

    return (
        <Box as='label'>
            <input {...input} />
            <Box
                {...checkbox}
                cursor='pointer'
                borderWidth='1px'
                borderRadius='md'
                boxShadow='md'
                _checked={{
                    bg: 'orange.300',
                    color: 'white',
                    borderColor: 'orange.300',
                }}
                _focus={{
                    boxShadow: 'outline',
                }}
                px={2}
                py={2}
            >
                {props.children}
            </Box>
        </Box>
    )
}

export default function FeedbackButton() {
    const { user } = useContext(AuthContext)
    const options = ['suggestion', 'bug', 'other']
    const [showFeedbackDialog, setShowFeedbackDialog] = useState(false)
    const [disableFeedback, setDisableFeedback] = useState(false)
    const open = () => setShowFeedbackDialog(true)
    const close = () => setShowFeedbackDialog(false)
    const toast = useToast()

    const [feedbackType, setFeedbackType] = useState('suggestion')
    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'suggestion',
        defaultValue: 'suggestion',
        value: feedbackType,
        onChange: setFeedbackType,
    })

    const group = getRootProps()
    const messageRef = useRef()

    const submitFeedback = () => {
        console.log("Submit")
        toast({
            description: "Feedback submitted!",
            status: "success",
            position: "top-right"
        })

        close()
    }

    return (
        <Popover
            returnFocusOnClose={false}
            placement='top-end'
            onClose={close}
            closeOnBlur={true}
            initialFocusRef={messageRef}
            isOpen={showFeedbackDialog}
        >
            {!disableFeedback && <PopoverTrigger>
                <Container
                    opacity={'70%'}
                    backgroundColor={'white'}
                    height='2em'
                    roundedTop='md'
                    shadow='base'
                    padding='0'
                    _hover={{
                        opacity: '100%'
                    }}
                >
                    <HStack minHeight='100%' paddingX='3' spacing='2'>
                        <Button
                            backgroundColor='inherit'
                            size='xs'
                            rounded='lg'
                            _hover={{
                                background: 'blackAlpha.100'
                            }}
                            onClick={() => setShowFeedbackDialog(!showFeedbackDialog)}
                            leftIcon={showFeedbackDialog ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}
                        >
                            send feedback
                        </Button>
                        <Tooltip label={'hide this'}>
                            <span>
                                <Button
                                    size={'3xs'}
                                    backgroundColor={'inherit'}
                                    rounded='lg'
                                    as={MdOutlineClose}
                                    onClick={() => {
                                        close()
                                        setDisableFeedback(true)
                                    }} />
                            </span>
                        </Tooltip>
                    </HStack>
                </Container>
            </PopoverTrigger>
            }
            <Portal>
                <PopoverContent shadow={'base'}>
                    <PopoverArrow />
                    <PopoverHeader>
                        <HStack>
                            <MdOutlineFeedback />
                            <Text>Leave feedback</Text>
                        </HStack>
                    </PopoverHeader>

                    <PopoverCloseButton />

                    <PopoverBody>
                        <VStack spacing={5}>
                            <Text>Thank you for helping improve arkett by providing feedback!</Text>
                            <HStack {...group}>
                                {
                                    options.map((value) => {
                                        const radio = getRadioProps({ value })
                                        return (
                                            <RadioCard key={value} {...radio}>
                                                {value}
                                            </RadioCard>
                                        )
                                    })
                                }
                            </HStack>
                            <Textarea
                                ref={messageRef}
                                placeholder={'Message'}
                                variant={'filled'}
                                maxH={'20em'}
                                minH={'5em'}
                                overflow={'auto'}
                                rows='5'
                            />
                        </VStack>

                    </PopoverBody>

                    <PopoverFooter display={'flex'} flexDir={'column'} alignItems={'center'}>
                        <Button
                            colorScheme='green'
                            shadow='base'
                            onClick={submitFeedback}
                        >
                            submit
                        </Button>
                    </PopoverFooter>
                </PopoverContent>
            </Portal>
        </Popover>
    )
}