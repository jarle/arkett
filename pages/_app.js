import { ChakraProvider } from '@chakra-ui/react';
import '@fontsource/nunito';
import React from 'react';
import AuthProvider from '../src/state/AuthProvider';
import EditorContentProvider from '../src/state/EditorContentProvider';
import { theme } from '../styles/theme';
import 'react-quill/dist/quill.bubble.css';
import '../styles/quillstyling.css'
import CloudSyncProvider from '../src/state/CloudSyncProvider';

function MyApp({ Component, pageProps }) {
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