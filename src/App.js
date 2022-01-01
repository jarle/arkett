import React from 'react';
import Auth from './components/Auth';
import TextEditor from './components/TextEditor';
import AuthProvider from './state/AuthProvider';
import EditorContentProvider from './state/EditorContentProvider';
import './styles/app.css';


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
