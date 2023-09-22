import React from "react";
import { Box, Grid, Button, Input, Flex, Text } from "@chakra-ui/react";

const NumberInput = ({ value, onChange, onSendClick }) => {
  const handleButtonClick = (number) => {
    onChange(value + number);
  };

  const handleSendClick = () => {
    onChange("");
    onSendClick();
  };

  const numberButtons = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

  return (
    <Flex p={4} flexDir={"column"} alignItems={"center"}>
      <Grid
        templateColumns="repeat(3, 1fr)"
        gap={2}
        width={"100%"}
        maxWidth={"400px"}
      >
        {numberButtons.map((number) => (
          <Button
            backgroundColor={"#f0f0f0"}
            key={number}
            height={"80px"}
            onClick={() => handleButtonClick(number)}
          >
            <Text fontWeight={"bold"} fontSize={"30px"}>{number}</Text>
          </Button>
        ))}
      </Grid>
      <Button
        colorScheme="blue"
        height={"80px"}
        width={"100%"}
        maxWidth={"400px"}
        onClick={handleSendClick}
        mt={"medium"}
      >
        Send
      </Button>
    </Flex>
  );
};

export default NumberInput;
