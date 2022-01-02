import { Button } from '@chakra-ui/react'
import Link from 'next/link'
import { useContext } from 'react'
import { AuthContext } from '../state/AuthProvider'
import { EditorContentContext } from '../state/EditorContentProvider'
import { supabase } from '../utils/supabaseClient'

export default function Auth() {
  const { session } = useContext(AuthContext)
  const { setContent } = useContext(EditorContentContext)

  const logout = () => {
    const logoutContent = `
    <h1>Logged out</h1>
    <p>Logged out successfully.</p>
    `
    setContent(logoutContent)
    supabase.auth.signOut()
  }

  const logOutButton = () => {
    return (
      <Button
        onClick={logout}
        shadow={'base'}
      >
        Log out
      </Button>
    )
  }

  const logInButton = () => {
    return (
      <Link href='login'>
        <Button
          shadow={'base'}
        >
          Log in
        </Button>
      </Link>
    )
  }

  return (
    session ? logOutButton() : logInButton()
  )
}