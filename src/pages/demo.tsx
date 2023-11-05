import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import Mermaid from "@/components/ui/mermaid";
import { example } from "@/lib/example";
import Navbar from "@/components/ui/Navbar";
import { SessionProvider } from "next-auth/react";

interface ExampleResponse {
  choices: { message: { content: string } }[];
}

export default function Demo() {
  const [example1, setExample] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [text2, setText] = useState<string | null>(null);
  const [temp, setTemp] = useState<string | null>(null);

  useEffect(() => {
    setHydrated(true);
    // Initialize text2 with the value from local storage
    setText(window.localStorage.getItem("Text"));
  }, []);

  useEffect(() => {
    const fetchExample = async () => {
      try {
        if (hydrated && text2) {
          const [response, responseForSummary] = await Promise.all([
            axios.post<ExampleResponse>("/api/magic", { text: text2 }),
            axios.post<string>("/api/summarize", { text7: text2 }),
          ]);

          const content = response.data.choices[0].message.content;
          setExample(replaceNewlines(content));
          setTemp(responseForSummary.data);
          console.log(responseForSummary);
          console.log(replaceNewlines(content));
        }
      } catch (error) {
        console.error(error);
        setExample(example);
      }
    };

    fetchExample();
  }, [hydrated, text2]);

  function replaceNewlines(inputString: string) {
    inputString = inputString.replace(/```mermaid/, "");
    inputString = inputString.replace(/```/, "");
    inputString = inputString.replace(/\\n/g, "\n");
    return inputString.trim(); // Trim leading and trailing whitespace
  }

  return (
    <>
      <SessionProvider>
        <Navbar />
        {example1 && <Mermaid chart={example1} />}
        {console.log(example1)}
        {temp && (
          <div>
            <p>{temp.choices[0].message.content}</p>
          </div>
        )}
      </SessionProvider>
    </>
  );
}
