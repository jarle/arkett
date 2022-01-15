import { ChakraProvider } from '@chakra-ui/react';
import '@fontsource/caveat';
import '@fontsource/nunito';
import React from 'react';
import AuthProvider from '../src/state/AuthProvider';
import EditorContentProvider from '../src/state/EditorContentProvider';
import { theme } from '../styles/theme';
import 'react-quill/dist/quill.bubble.css';
import '../styles/quillstyling.css'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <EditorContentProvider>
          <Component {...pageProps} />
        </EditorContentProvider>
      </AuthProvider>
    </ChakraProvider>
  )
}

export default MyApp