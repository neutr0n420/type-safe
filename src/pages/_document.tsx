import { Html, Head, Main, NextScript } from "next/document";
import { SessionProvider } from "next-auth/react";
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <SessionProvider>
          <Main />
          <NextScript />
        </SessionProvider>
      </body>
    </Html>
  );
}
