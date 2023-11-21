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
  MenuItem,
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
          <Box p={4}>
            <Menu>
              <MenuButton as={Button} colorScheme="blue">
                SELECT GAME
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => router.push("/game")}>
                  CASUAL GAME
                </MenuItem>
                <MenuItem onClick={() => router.push("/prime")}>
                  PRIME GAME
                </MenuItem>
                <MenuItem onClick={() => router.push("/fibonacci")}>
                  FIBONACCI GAME
                </MenuItem>
              </MenuList>
            </Menu>
            <Menu>
              <MenuButton as={Button} colorScheme="blue">
                HIGHSCORES
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => router.push("/highscore")}>
                  CASUAL
                </MenuItem>
                <MenuItem onClick={() => router.push("/primehighscore")}>
                  PRIME
                </MenuItem>
                <MenuItem onClick={() => router.push("/fibhighscore")}>
                  FIBONACCI
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
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
