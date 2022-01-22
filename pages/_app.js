import { ChakraProvider } from '@chakra-ui/react';
import '@fontsource/nunito';
import React from 'react';
import 'react-quill/dist/quill.bubble.css';
import AuthProvider from '../src/state/AuthProvider';
import CloudSyncProvider from '../src/state/CloudSyncProvider';
import EditorContentProvider from '../src/state/EditorContentProvider';
import '../styles/index.css';
import '../styles/quillstyling.scss';
import { theme } from '../styles/theme';

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