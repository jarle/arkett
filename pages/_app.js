import { ChakraProvider } from '@chakra-ui/react';
import '@fontsource/nunito';
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
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <EditorContentProvider>
          <CloudSyncProvider>
            <Component {...pageProps} />
          </CloudSyncProvider>
        </EditorContentProvider>

      </AuthProvider>
    </ChakraProvider>
  )
}

export default MyApp