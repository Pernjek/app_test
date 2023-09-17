import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { userService } from "services";
import { Nav, Alert } from "components";
import { ChakraProvider } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { setupTheme } from "theme/theme";

export default App;

function App({ Component, pageProps }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // on initial load - run auth check
    authCheck(router.asPath);

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setAuthorized(false);
    router.events.on("routeChangeStart", hideContent);

    // on route change complete - run auth check
    router.events.on("routeChangeComplete", authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };
  }, []);

  function authCheck(url) {
    // redirect to login page if accessing a private page and not logged in
    const publicPaths = ["/account/login", "/account/register"];
    const path = url.split("?")[0];
    if (!userService.userValue && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: "/account/login",
        query: { returnUrl: router.asPath },
      });
    } else {
      setAuthorized(true);
    }
  }

  const brandTheme = setupTheme({});

  return (
    <ChakraProvider theme={brandTheme}>
      <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
        {authorized && <Component {...pageProps} />}
      </AnimatePresence>
    </ChakraProvider>
  );
}
