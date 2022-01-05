import { Center, Text, LinkBox, LinkOverlay } from '@chakra-ui/react'

export default function Logo() {
    return (
        <Center>
            <LinkBox>
                <LinkOverlay href='#'>
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
