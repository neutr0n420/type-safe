import Mermaid from "@/components/ui/mermaid";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { example } from "@/lib/example";

export default function Demo() {
  const [example1, setExample] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    const fetchExample = async () => {
      try {
        const response = await axios.post('/api/magic', text1);
        const content = response.data.choices[0].message.content;
        setExample(replaceNewlines(content));
        console.log(replaceNewlines(content))
      } catch (error) {
        console.error(error);
        setExample(example);
      }
    };
    if (hydrated) {
      fetchExample();
    }
  }, [hydrated]);

  function replaceNewlines(inputString: string) {
    inputString = inputString.replace(/```mermaid/, '');

    // Remove "```" from the end of the string
    inputString = inputString.replace(/```/, '');

    // Replace "\\n" with newline character
    inputString = inputString.replace(/\\n/g, '\n');

    return inputString.trim(); // Trim leading and trailing whitespace

  }

  const text1 = {
    text: `
  A greedy algorithm is a simple yet effective approach in solving optimization problems. It operates by making a series of locally optimal choices at each step, with the hope that these choices will lead to a globally optimal solution. The key characteristic of a greedy algorithm is its myopic decision-making, as it focuses solely on the current step without considering the potential consequences down the line. While this approach may not always guarantee the absolute best solution, it often provides a reasonably good solution in a quick and efficient manner. Greedy algorithms are commonly used in a variety of fields, such as computer science, mathematics, and economics, and they are particularly useful for problems where finding the optimal solution is either computationally expensive or not necessary for practical purposes.
  `
  };

  return (
    <>
      {example1 && <Mermaid chart={example1} />}
    </>
  );
}

