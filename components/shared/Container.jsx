import { Flex } from "@chakra-ui/react";

export const Container = (props) => (
  <Flex
    direction="column"
    alignItems="center"
    justifyContent="flex-start"
    _dark={{
      bgGradient: "linear(to-tr, backgroundColor, gray.600)",
    }}
    bgGradient="linear(to-bl, whiteAlpha.900, backgroundColor)"
    pb="customLarge"
    {...props}
  />
);
