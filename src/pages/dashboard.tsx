"use client";
import Navbar from "@/components/ui/Navbar";
import { Button } from "@/components/ui/button";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";

import Link from "next/link";

const Dashboard = () => {
  return (
    <SessionProvider>
      {/* <div className=" mx-12 my-3">
        <nav className="flex justify-between">
          <Link href="/">TypeSafe </Link>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger>Open</DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
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
                <DropdownMenuItem>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>
      </div> */}
      <Navbar />
    </SessionProvider>
  );
};
export default Dashboard;
