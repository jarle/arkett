import React from 'react';
import Auth from '../src/components/Auth';
import TextEditor from '../src/components/TextEditor';
import AuthProvider from '../src/state/AuthProvider';
import EditorContentProvider from '../src/state/EditorContentProvider';
import '../styles/app.css';
import '../styles/editorstyling.css';


const MainAppBody = () => (
  <EditorContentProvider>
    <TextEditor />
    <Auth />
  </EditorContentProvider>
)

const App = () => {
  return (
    <div className="App">
      <AuthProvider>
        <MainAppBody />
      </AuthProvider>
    </div>
  );
}

export default App;
