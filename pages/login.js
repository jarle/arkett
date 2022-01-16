import { CheckIcon } from '@chakra-ui/icons';
import { Button, Center, Container, Heading, HStack, List, ListIcon, ListItem, Text, useToast, VStack } from '@chakra-ui/react';
import { FaFacebook, FaMicrosoft } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import Logo from '../src/components/Logo';
import { supabase } from '../src/utils/supabaseClient';



export default function All() {
    const URL = process.env.NEXT_PUBLIC_VERCEL_URL || (() => { throw Error("URL need to be set for redirects") })();
    const toast = useToast()

    const login = async (provider) => {
        await supabase.auth.signIn({
            provider: provider,
            redirectTo: URL,
        })
        toast({
            description: "Successfully signed in, redirecting.",
            status: "success",
            position: "top-right",
            isClosable: true
        })
    }

    return (
        <Center height='100vh' maxWidth='100vw'>
            <VStack spacing={'20'}>
                <Logo />
                <Center>
                    <VStack spacing={'50'}>
                        <Container
                            rounded={'md'}
                            background={'white'}
                            shadow={'lg'}
                            maxWidth={'90%'}
                            padding={'6'}
                            variant={'outline'}
                        >
                            <Heading size={'md'} marginBottom={'3'} > Sign in to arkett to: </Heading>
                            <List spacing={'2'}>
                                {
                                    [
                                        "Back up existing notes",
                                        "Synchronize notes between devices",
                                        //"Archive arketts",
                                        //"Publish arketts"
                                    ]
                                        .map(
                                            description => (
                                                <ListItem key={description} >
                                                    <HStack spacing='0'>
                                                        <ListIcon as={CheckIcon} color='green.500' />
                                                        <Text>{description}</Text>
                                                    </HStack>
                                                </ListItem>
                                            )
                                        )
                                }
                                <ListItem>
                                    ...and more features coming in the near future!
                                </ListItem>
                            </List>
                        </Container>
                        <Container
                            padding={'4'}
                            rounded={'lg'}
                            width={['90%', 'md']}
                        >
                            <VStack spacing={2} align={'center'} w={'full'}>
                                <Button
                                    w={'full'}
                                    background={'white'}
                                    variant={'outline'}
                                    shadow={'md'}
                                    padding={'5'}
                                    leftIcon={<FcGoogle />}
                                    onClick={() => login('google')}
                                >
                                    <Center>
                                        <Text>Sign in with Google</Text>
                                    </Center>
                                </Button>
                                {/* <Button
                                    w={'full'}
                                    backgroundColor={'black'}
                                    colorScheme={'apple'}
                                    shadow={'md'}
                                    leftIcon={<FaApple />}
                                    onClick={() => login('apple')}
                                >
                                    <Center>
                                        <Text>Sign in with Apple</Text>
                                    </Center>
                                </Button> */}
                                <Button
                                    w={'full'}
                                    colorScheme={'facebook'}
                                    shadow={'md'}
                                    padding={'5'}
                                    leftIcon={<FaFacebook />}
                                    onClick={() => login('facebook')}
                                >
                                    <Center>
                                        <Text>Continue with Facebook</Text>
                                    </Center>
                                </Button>
                                <Button
                                    w={'full'}
                                    backgroundColor={"#2F2F2F"}
                                    color={"#FFFFFF"}
                                    shadow={'md'}
                                    padding={'5'}
                                    leftIcon={<FaMicrosoft />}
                                    onClick={() => login('azure')}
                                >
                                    <Center>
                                        <Text>Sign in with Microsoft</Text>
                                    </Center>
                                </Button>
                            </VStack>

                        </Container>

                    </VStack>
                </Center>
            </VStack>
        </Center>
    );
}