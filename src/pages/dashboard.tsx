"use client";

import Navbar from "@/components/ui/Navbar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SessionProvider } from "next-auth/react";
import { useEdgeStore } from "@/lib/edgestore";

const Dashboard = () => {
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();

  const [url, setUrl] = useState<string>('');

  return (
    <SessionProvider>
      <Navbar />
      <div>
        <input
          type="file"
          className="flex flex-col items-center m-6 gap-2"
          onChange={(e) => {
            setFile(e.target.files?.[0]);
          }}
        />

        {file ?
          <Button
            className=""
            onClick={async () => {
              if (file) {
                const res = await edgestore.publicFiles.upload({ file });
                console.log(res.url);
                setUrl(res.url)
              }
            }}
          >
            Upload
          </Button>
          :
          <Button> Temp </Button>

        }
      </div>
    </SessionProvider>
  );
};
export default Dashboard;
