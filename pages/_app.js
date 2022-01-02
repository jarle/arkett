import { ChakraProvider } from '@chakra-ui/react';
import '@fontsource/nunito';
import '@fontsource/caveat';
import React from 'react';
import '../styles/app.css';
import '../styles/editorstyling.scss';
import { theme } from '../styles/theme';
import AuthProvider from '../src/state/AuthProvider';
import EditorContentProvider from '../src/state/EditorContentProvider';

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