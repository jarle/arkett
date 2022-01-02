import { useContext } from 'react'
import { AuthContext } from '../state/AuthProvider'
import { EditorContentContext } from '../state/EditorContentProvider'
import { supabase } from '../utils/supabaseClient'

export default function Auth() {
  const { session } = useContext(AuthContext)
  const { setContent } = useContext(EditorContentContext)

  const URL = process.env.NEXT_PUBLIC_VERCEL_URL;

  const login = () => {
    supabase.auth.signIn({
      provider: "github",
      redirectTo: URL
    })
  }

  const logout = () => {
    setContent("")
    supabase.auth.signOut()
  }

  const logOutButton = () => {
    return <button onClick={logout}>Log out</button>
  }

  const logInButton = () => {
    return <button onClick={login}>Log in</button>
  }

  return (
    session ? logOutButton() : logInButton()
  )
}