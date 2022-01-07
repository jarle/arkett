import { Box, Center, VStack } from '@chakra-ui/react';
import Head from 'next/head';
import { React } from 'react';
import LoginButton from '../src/components/LoginButton';
import Logo from '../src/components/Logo';
import AccountMenu from '../src/components/Menu';
import TextEditor from '../src/components/TextEditor';

const MainAppBody = () => (
  <Box height={'100vh'} width={'100vw'} >
    <Box padding={'2'} position={'absolute'} top={'0'} left={'0'}>
      <AccountMenu />
    </Box>

    <VStack spacing={'5'} >
      <Center>
        <Logo />
      </Center>

      <TextEditor />
      <LoginButton />
    </VStack>
  </Box>
)

const App = () => {
  return (
    <div className="App">
      <MainAppBody />
    </div>
  );
}

export default function Home() {
  return (
    <div>
      <Head>
        <title>arkett</title>
        <meta name="description" content="arkett - the minimalist note editor" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <App />
      </main>
    </div>

  )
}