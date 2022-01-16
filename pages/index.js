import { Box, Center, VStack } from '@chakra-ui/react';
import Head from 'next/head';
import { React } from 'react';
import FeedbackButton from '../src/components/FeedbackButton';
import LoginButton from '../src/components/LoginButton';
import Logo from '../src/components/Logo';
import AccountMenu from '../src/components/Menu';
import TextEditor from '../src/components/TextEditor';
import FeedbackProvider from '../src/state/FeedbackProvider';

const MainAppBody = () => (
  <Box height={'100vh'} width={'100vw'} >
    <Box paddingLeft={'3'} position={'absolute'} top={'0'} left={'0'}>
      <AccountMenu />
    </Box>

    <VStack spacing={'5'} marginTop={'3'}>
      <Center>
        <Logo />
      </Center>

      <TextEditor />
      <LoginButton />
      <Box position={'fixed'} bottom={'0'} right={'10'} width='auto'>
        <FeedbackButton />
      </Box>
    </VStack>
  </Box>
)

const App = () => {
  return (
    <div className="App">
      <FeedbackProvider>
        <MainAppBody />
      </FeedbackProvider>
    </div>
  );
}

export default function Home({ error }) {
  return (
    <div>
      <Head>
        <title>arkett</title>
        <meta name="description" content="arkett - the minimalist note editor" />
        <link rel="icon" href="/arkett_icon.png" />
      </Head>

      <main>
        <App />
      </main>
    </div>

  )
}