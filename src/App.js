import React, { useContext } from 'react';
import Auth from './components/Auth';
import AuthProvider, { AuthContext } from './state/AuthProvider';
import EditorContentProvider from './state/EditorContentProvider';
import TextEditor from './components/TextEditor';


const MainAppBody = () => {
  const { session } = useContext(AuthContext)
  return session ?
    (
      <EditorContentProvider>
        <TextEditor />
        <Auth />
      </EditorContentProvider>
    ) :
    (
      <EditorContentProvider>
        <div>not logged in</div>
        <Auth />
      </EditorContentProvider>
    )
}

const App = () => {
  return (
    <div className="App">
      <h2>arkett</h2>
      <AuthProvider>
        <MainAppBody />
      </AuthProvider>
    </div>
  );
}

export default App;
