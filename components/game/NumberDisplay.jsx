import { Flex, Text } from "@chakra-ui/react";

const NumberDisplay = ({ backgroundColor, userGuess, message }) => {
  return (
    <Flex
      flex={1}
      justifyContent={"center"}
      alignItems={"center"}
      flexDir={"column"}
    >
      <Flex
        backgroundColor={backgroundColor}
        rounded={"full"}
        h={"80px"}
        w={"250px"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Text fontSize={"large"} fontWeight={"bold"}>
          {userGuess ? userGuess : ""}
        </Text>
        {userGuess ? (
          ""
        ) : (
          <Text textAlign={"center"} fontWeight={"bold"} mt={"xxsmall"}>
            {message}
          </Text>
        )}
      </Flex>
    </Flex>
  );
};

export default NumberDisplay;
