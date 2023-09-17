import { Box, Button, Text } from "@chakra-ui/react";
import Image from "next/image";

export const PopupButton = ({ handle, text, src }) => (
  <Button
    onClick={handle}
    bg="menuItemBackground"
    width="100%"
    p="5%"
    flexDirection="row"
    justifyContent="flex-start"
    alignItems="center"
    borderRadius="0"
    leftIcon={<Image src={src} alt={text} height={20} />}
  >
    <Text pl="xsmall" fontWeight={"400"}>
      {text}
    </Text>
  </Button>
);
