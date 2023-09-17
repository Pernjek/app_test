import { ColorModeScript } from "@chakra-ui/react";
import { Html, Head, Main, NextScript } from "next/document";

export default Document;

function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Number Guessing Game</title>
      </Head>

      <body>
        <ColorModeScript />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
