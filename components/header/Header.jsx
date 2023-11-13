import {
  Box,
  Flex,
  Stack,
  Button,
  MenuButton,
  Menu,
  MenuList,
  MenuDivider,
  VStack,
  Text,
  Center,
  Select,
  WrapItem,
  Wrap,
} from "@chakra-ui/react";
import { DarkModeSwitch } from "./DarkModeSwitch";
import { userService } from "services";
import { useRouter } from "next/router";

export const Header = () => {
  const router = useRouter();
  const handleLogout = (event) => {
    userService.logout();
  };

  return (
    <Box
      bg={"headerColor"}
      px={"xxsmall"}
      position={"fixed"}
      top={0}
      width={"100%"}
      zIndex={1000}
      boxShadow="0px 2px 8px 0px rgba(0,0,0,0.2)"
    >
      <Flex
        h={"90px"}
        alignItems={"center"}
        justifyContent={"space-between"}
        px={"medium"}
        spacing={4}
      >
        {userService.userValue && (
          <Wrap >
            <WrapItem>
              <Button
                onClick={() => router.push("/game")}
                background={
                  router.pathname === "/game"
                    ? "lightgreen"
                    : "buttonBackground"
                }
              >
                CASUAL GAME
              </Button>
            </WrapItem>
            <WrapItem>
              <Button
                onClick={() => router.push("/prime")}
                background={
                  router.pathname === "/prime"
                    ? "lightgreen"
                    : "buttonBackground"
                }
              >
                PRIME GAME{" "}
              </Button>
            </WrapItem>
            <WrapItem>
              <Button
                onClick={() => router.push("/fibonacci")}
                background={
                  router.pathname === "/fibonacci"
                    ? "lightgreen"
                    : "buttonBackground"
                }
              >
                FIBONACCI GAME{" "}
              </Button>
            </WrapItem>
            <WrapItem>
              <Button
                onClick={() => router.push("/highscore")}
                background={
                  router.pathname === "/highscore"
                    ? "lightgreen"
                    : "buttonBackground"
                }
              >
                HIGHSCORE
              </Button>
            </WrapItem>
          </Wrap>
        )}
        {userService.userValue && (
          <Box>
            <Menu>
              <MenuButton as={Button} rounded={"full"} variant={"link"}>
                <Center
                  bg="avatarColor"
                  minW="3large"
                  minH="3large"
                  borderRadius="full"
                >
                  <Text fontWeight="bold" fontSize="large" p="medium">
                    {userService.userValue?.username}
                  </Text>
                </Center>
              </MenuButton>
              <MenuList
                alignItems={"center"}
                position="fixed"
                top="-64px"
                right="-64px"
                maxW="360px"
                background={"menuBackground"}
              >
                <Box px="medium">
                  <Text fontSize={"xlarge"} fontWeight="bold" noOfLines={1}>
                    {userService.userValue?.username}
                  </Text>
                </Box>
                <MenuDivider />
                <VStack spacing={2}>
                  <Button
                    onClick={handleLogout}
                    bg="menuItemBackground"
                    width="100%"
                    p="5%"
                    flexDirection="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    borderRadius="0"
                  >
                    <Text pl="xsmall" fontWeight={"400"}>
                      Logout
                    </Text>
                  </Button>

                  <VStack>
                    <DarkModeSwitch />
                  </VStack>
                </VStack>
              </MenuList>
            </Menu>
          </Box>
        )}
      </Flex>
    </Box>
  );
};
