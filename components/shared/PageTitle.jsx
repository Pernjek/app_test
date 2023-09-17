import { Box, Text } from "@chakra-ui/react";

export const PageTitle = (props) => (
  <Box alignItems={"flex-start"} py={"medium"} pb={"xxlarge"}>
    <Text fontSize={"title"} fontWeight={"normal"}>
      {props.title}
    </Text>
  </Box>
);
