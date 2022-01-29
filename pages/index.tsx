import { Box, Center, VStack } from '@chakra-ui/react';
import React from 'react';
import FeedbackButton from '../src/components/FeedbackButton';
import LoginButton from '../src/components/LoginButton';
import Logo from '../src/components/Logo';
import AccountMenu from '../src/components/Menu';
import TextEditor from '../src/components/TextEditor';
import FeedbackProvider from '../src/state/FeedbackProvider';

const MainAppBody = () => (
  <Box>
    <Box paddingLeft={'3'} position={'absolute'} top={'0'} left={'0'}>
      <AccountMenu />
    </Box>

    <VStack spacing={'5'} marginTop={'3'}>
      <Center>
        <Logo />
      </Center>

      <TextEditor />
      <LoginButton />
      <FeedbackButton />
    </VStack>
  </Box>
)

export default function Home({ error }) {
  return (
    <div className="App">
      <FeedbackProvider>
        <MainAppBody />
      </FeedbackProvider>
    </div>
  );
}