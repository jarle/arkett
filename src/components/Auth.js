import { useContext } from 'react'
import { AuthContext } from '../state/AuthProvider'
import { supabase } from '../supabaseClient'

export default function Auth() {
  const { session } = useContext(AuthContext)

  const login = () => {
    supabase.auth.signIn({
      provider: "github"
    })
  }

  const logout = () => {
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