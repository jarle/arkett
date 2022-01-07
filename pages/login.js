import { Button, Center, Container, Heading, List, ListIcon, ListItem, Text, UnorderedList, VStack } from '@chakra-ui/react';
import { FaApple, FaCloud, FaFacebook, FaMicrosoft } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { supabase } from '../src/utils/supabaseClient';

import Logo from '../src/components/Logo'
import { CheckIcon } from '@chakra-ui/icons';


export default function All() {
    const URL = process.env.NEXT_PUBLIC_VERCEL_URL;
    const login = (provider) => {
        supabase.auth.signIn({
            provider: provider,
            redirectTo: URL
        })
    }

    return (
        <Container height='100vh'>
            <VStack spacing={'20'}>
                <Logo />
                <Center>
                    <VStack spacing={'50'}>
                        <Container
                            rounded={'md'}
                            background={'white'}
                            shadow={'lg'}
                            padding={'6'}
                            variant={'outline'}
                        >
                            <Heading size={'md'} marginBottom={'3'} > Sign in to arkett to: </Heading>
                            <List spacing={'2'}>
                                <ListItem>
                                    <ListIcon as={CheckIcon} color='green.500' />
                                    Back up existing notes
                                </ListItem>
                                <ListItem>
                                    <ListIcon as={CheckIcon} color='green.500' />
                                    Synchronize notes between devices
                                </ListItem>
                                <ListItem>
                                    <ListIcon as={CheckIcon} color='green.500' />
                                    Publish arketts
                                </ListItem>
                                <ListItem>
                                    ...and much more!
                                </ListItem>
                            </List>
                        </Container>
                        <Container
                            padding={'4'}
                            rounded={'lg'}
                            width={'md'}
                        >
                            <VStack spacing={2} align={'center'} w={'full'}>
                                <Button
                                    w={'full'}
                                    background={'white'}
                                    variant={'outline'}
                                    shadow={'md'}
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
        </Container>
    );
}