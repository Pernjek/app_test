import Head from "next/head";
import { Box, Stack } from "@chakra-ui/react";
import { Container } from "./Container";
import { Header } from "../header/Header";
import { MotionLayout } from "./MotionLayout";
import { userService } from "services";
import Favicon from "./Favicon";

const HEADER_HEIGHT = "90px";

export const PageLayout = ({ children }) => {
  return (
    <Container minH="100vh">
      <Head>
        <title>Number Guessing Game</title>
      </Head>
      {userService.userValue && <Header />}
      <MotionLayout>
        <Stack
          mt={HEADER_HEIGHT}
          flexDir="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box width={["360px", "460px", "700px", "868px", "1126px"]}>
            {children}
          </Box>
        </Stack>
      </MotionLayout>
    </Container>
  );
};
