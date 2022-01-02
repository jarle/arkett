import { Button, Center, Stack, Text } from '@chakra-ui/react';
import { useContext } from 'react';
import { FaApple, FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '../src/state/AuthProvider';
import { EditorContentContext } from '../src/state/EditorContentProvider';
import { supabase } from '../src/utils/supabaseClient';

export default function All() {
    const { session } = useContext(AuthContext)
    const { setContent } = useContext(EditorContentContext)

    const URL = process.env.NEXT_PUBLIC_VERCEL_URL;
    const login = (provider) => {
        supabase.auth.signIn({
            provider: provider,
            redirectTo: URL
        })
    }

    return (
        <Center p={8} height={'100vh'}>
            <Stack spacing={2} align={'center'} maxW={'md'} w={'full'}>
                <Button
                    w={'full'}
                    background={'white'}
                    variant={'outline'}
                    leftIcon={<FcGoogle />}
                    onClick={() => login('google')}
                >
                    <Center>
                        <Text>Sign in with Google</Text>
                    </Center>
                </Button>
                <Button
                    w={'full'}
                    background={'black'}
                    colorScheme={'apple'}
                    leftIcon={<FaApple />}
                    onClick={() => login('apple')}
                >
                    <Center>
                        <Text>Sign in with iCloud</Text>
                    </Center>
                </Button>
                <Button
                    w={'full'}
                    colorScheme={'facebook'}
                    leftIcon={<FaFacebook />}
                    onClick={() => login('facebook')}
                >
                    <Center>
                        <Text>Continue with Facebook</Text>
                    </Center>
                </Button>
            </Stack>
        </Center>
    );
}