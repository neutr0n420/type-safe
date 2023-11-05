import { useSession, signIn } from "next-auth/react";
import { Button } from "./button";
import Link from "next/link";
const IndexButton = () => {
  const session = useSession();
  return (
    <div className=" mt-12">
      {session.status === "authenticated" ? (
        <Link href="/dashboard">
          <Button> Start Creating </Button>
        </Link>
      ) : (
        <Button onClick={() => signIn()}>login</Button>
      )}
    </div>
  );
};

export default IndexButton;
