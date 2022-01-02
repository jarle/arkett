import { VStack } from '@chakra-ui/react';
import Head from 'next/head';
import { React } from 'react';
import Auth from '../src/components/Auth';
import Logo from '../src/components/Logo';
import TextEditor from '../src/components/TextEditor';

const MainAppBody = () => (
  <VStack
    height={'100vh'}
    width={'100vw'}
    spacing={'5'}
  >
    <Logo />
    <TextEditor />
    <Auth />
  </VStack>
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
        <meta name="description" content="arkett - simple note taking" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <App />
      </main>
    </div>

  )
}