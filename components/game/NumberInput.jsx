import {
  Box,
  Grid,
  Button,
  Input,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";
import { useState } from "react";

export const NumberInput = () => {
  const [inputValue, setInputValue] = useState("");

  const handleButtonClick = (value) => {
    console.log(inputValue + value);
  };

  const handleSendClick = () => {
    console.log(inputValue);
    setInputValue("");
  };
  const numberButtons = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  return (
    <Box p={4}>
      <Input
        value={inputValue}
        placeholder="Enter a number"
        onChange={(e) => setInputValue(e.target.value)}
        mb={4}
      />
      <Grid templateColumns="repeat(3, 1fr)" gap={2}>
        {numberButtons.map((number) => (
          <Button key={number} onClick={() => handleButtonClick(number)}>
            {number}
          </Button>
        ))}
      </Grid>
      <Button colorScheme="blue" onClick={handleSendClick} mt={4}>
        Send
      </Button>
    </Box>
  );
};
