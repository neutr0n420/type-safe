import { useSession, signIn } from "next-auth/react"
import { Button } from "./button"
import Link from "next/link"
const IndexButton = () => {
  const session = useSession()
  return (
    <>
      {session.status === 'authenticated' ?
        <Link href="/dashboard">
          <Button> Start Creating </Button>
        </Link>
        : <Button onClick={() => signIn()}>
        login
        </Button>
      }
    </>

  )
}

export default IndexButton
