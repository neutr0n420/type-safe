import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./button";
import Image from "next/image";

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <div className=" mx-12 my-3">
      <nav className="flex justify-between">
        <Link href="/">TypeSafe </Link>
        {session ? (
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <img
                  src={session.user?.image}
                  width={50}
                  height={50}
                  alt="User's profile picture"
                  className=" rounded-full"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel> Hi! {session.user?.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  {" "}
                  <Link href="/">Home</Link>{" "}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  {" "}
                  <Link href="/playground"></Link>Playground
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()}>
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <Button onClick={() => signIn()}>Sign in</Button>
        )}
      </nav>
    </div>
  );
};
export default Navbar;
