import {
  Box,
  Flex,
  Button,
  MenuButton,
  Menu,
  MenuList,
  MenuDivider,
  VStack,
  Text,
  Center,
  MenuItem,
} from "@chakra-ui/react";
import { BellIcon, TimeIcon, StarIcon } from "@chakra-ui/icons";
import { DarkModeSwitch } from "./DarkModeSwitch";
import { userService } from "services";
import { useRouter } from "next/router";
export const Header = () => {
  const router = useRouter();
  const { pathname } = router;
  const isSelectGameActive =
    pathname === "/game" || pathname === "/prime" || pathname === "/fibonacci";

  const isHighscoreActive =
    pathname === "/highscore" ||
    pathname === "/primehighscore" ||
    pathname === "/fibhighscore";
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
              <MenuButton
                leftIcon={<TimeIcon />}
                colorScheme={isSelectGameActive ? "blue" : "gray"}
                as={Button}
              >
                <Text fontWeight="bold">SELECT GAME</Text>
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
              <MenuButton
                colorScheme={isHighscoreActive ? "blue" : "gray"}
                as={Button}
                m={4}
                leftIcon={<StarIcon />}
              >
                {" "}
                <Text fontWeight="bold">HIGHSCORES</Text>
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
              <MenuButton bg="lightgreen" as={Button} leftIcon={<BellIcon />}>
                <Center>
                  <Text fontWeight="bold">
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
