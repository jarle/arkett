import { ChakraProvider } from '@chakra-ui/react';
import '@fontsource/nunito';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import 'react-quill/dist/quill.bubble.css';
import { pageview } from '../src/lib/ga';
import AuthProvider from '../src/state/AuthProvider';
import CloudSyncProvider from '../src/state/CloudSyncProvider';
import EditorContentProvider from '../src/state/EditorContentProvider';
import '../styles/index.css';
import '../styles/quillstyling.scss';
import { theme } from '../styles/theme';

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = url => {
      pageview(url)
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])


  return (
    <>
      <Head>
        <title>arkett</title>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/arkett_icon_square.png"></link>

        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="arkett - the minimalist note editor" />
        <meta name="apple-mobile-web-app-capable" content="yes"></meta>
        <meta name="mobile-web-app-capable" content="yes"></meta>
      </Head>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <EditorContentProvider>
            <CloudSyncProvider>
              <Component {...pageProps} />
            </CloudSyncProvider>
          </EditorContentProvider>

        </AuthProvider>
      </ChakraProvider>
    </>
  )
}

export default MyApp