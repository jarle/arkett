import { Center, Text, LinkBox, LinkOverlay } from '@chakra-ui/react'

export default function Logo() {
    const URL = 'localhost:3000'
    return (
        <Center>
            <LinkBox>
                <LinkOverlay href={URL}>
                    <Text
                        fontFamily={'caveat'}
                        fontWeight={'bold'}
                        fontSize={'4xl'}
                        color={'white'}
                        opacity={'90%'}
                    >
                        arkett
                    </Text>
                </LinkOverlay>
            </LinkBox>
        </Center>
    )
}