import { Button } from '@chakra-ui/react'
import Link from 'next/link'
import { useContext } from 'react'
import { AuthContext } from '../state/AuthProvider'

export default function Auth() {
  const { session } = useContext(AuthContext)

  const logInButton = () => {
    return (
      <Link href='login'>
        <Button shadow={'md'} colorScheme={'green'} disabled={true}>
          Log in
        </Button>
      </Link>
    )
  }

  return (
    session ? null : logInButton()
  )
}
