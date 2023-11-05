"use client";

import Navbar from "@/components/ui/Navbar";
import axios from "axios";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { SessionProvider } from "next-auth/react";
import { useEdgeStore } from "@/lib/edgestore";

import { Document, Page, pdfjs } from "react-pdf";
import { useDropzone } from "react-dropzone";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Dashboard = () => {
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();

  const [url, setUrl] = useState<string>("");

  const [progressbar, setProgressbar] = useState(0);

  function replaceNewlines(inputString: string) {
    inputString = inputString.replace(/\n/g, "\n");
    return inputString; // Trim leading and trailing whitespace
  }

  return (
    <SessionProvider>
      <Navbar />
      <hr />
      <div className="flex flex-col justify-center my-8">
        <label className="flex text-center  py-64 w-1/2 mx-auto  border-2   border-black border-opacity-40 border-dashed  rounded-md  cursor-pointer ">
          <span className="flex items-center justify-center w-full ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <span className=" text-3xl text-gray-600  ">PDF</span>
          </span>
          <input
            type="file"
            name="file_upload"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0])}
            accept=".pdf"
          />
        </label>
        {progressbar === 100 ? (
          <Link href="/demo">
            <Button className="w-1/4 mx-auto my-8 pl-8 flex justify-center">
              Go To Demo
            </Button>
          </Link>
        ) : (
          <Button
            className="w-1/4 mx-auto my-8  "
            onClick={async () => {
              if (file) {
                const res = await edgestore.publicFiles.upload({
                  file,
                  onProgressChange: (progress) => {
                    console.log(progress);
                    setProgressbar(progress);
                  },
                });
                console.log(res);
                setUrl(res.url);
                const body = {
                  pdfUrl: res.url,
                };
                const textIgot = await axios.post("/api/readstream", body);
                console.log(textIgot);

                const textIwant = textIgot.data.text;
                window.localStorage.setItem(
                  "Text",
                  JSON.stringify(replaceNewlines(textIwant))
                );
              }
            }}
          >
            Upload
          </Button>
        )}

        <Progress value={progressbar} className="w-3/4 mx-auto" />
        {/* <div>
          <Document
            file="https://files.edgestore.dev/0esq3jvcv7s562de/publicFiles/_public/95598a56-d7fe-434f-8a44-3e3199e95f56.pdf"
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} />
          </Document>
          <p>
            Page {pageNumber} of {numPages}
          </p>
          <button
            onClick={() => setPageNumber(pageNumber - 1)}
            disabled={pageNumber <= 1}
          >
            Previous
          </button>
          <button
            onClick={() => setPageNumber(pageNumber + 1)}
            // @ts-ignore
            disabled={pageNumber >= numPages}
          >
            Next
          </button>
        </div> */}
      </div>
    </SessionProvider>
  );
};
export default Dashboard;
