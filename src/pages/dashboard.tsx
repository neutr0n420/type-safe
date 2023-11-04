"use client";
import Navbar from "@/components/ui/Navbar";
import { Button } from "@/components/ui/button";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";

import Link from "next/link";

const Dashboard = () => {
  return (
    <SessionProvider>
      <Navbar />
    </SessionProvider>
  );
};
export default Dashboard;
