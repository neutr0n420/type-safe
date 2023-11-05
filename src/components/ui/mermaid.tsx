import React, { useEffect } from "react";
import mermaid from "mermaid";

export interface MermaidProps {
  text: string;
}

export default function Mermaid({ chart }: { chart: any }) {

  useEffect(() => {
    mermaid.contentLoaded();
  }, []);

  return (
    <div className="mermaid" suppressHydrationWarning>
    {console.log('here')}
      {chart}
    </div>
  )

};

