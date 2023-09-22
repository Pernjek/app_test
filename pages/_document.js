import { ColorModeScript } from "@chakra-ui/react";
import Favicon from "components/shared/Favicon";
import { Html, Head, Main, NextScript } from "next/document";

export default Document;

function Document() {
  return (
    <Html lang="en">
      <Head>
        <Favicon />
      </Head>

      <body>
        <ColorModeScript />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
