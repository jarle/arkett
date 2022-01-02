import { Center, Text, LinkBox, LinkOverlay } from '@chakra-ui/react'

export default function Logo() {
    const URL = process.env.NEXT_PUBLIC_VERCEL_URL;
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