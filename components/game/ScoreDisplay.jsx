import React from "react";
import {
  Box,
  Table,
  Td,
  Tr,
  Text,
  Flex,
  Spinner,
  Tbody,
} from "@chakra-ui/react";

const ScoreDisplay = ({ scores }) => {
  return (
    <Box
      px={{ base: "5%", md: "10%" }} // Adjust the padding for different screen sizes
      py={{ base: "customSmall", md: "customMedium" }} // Adjust the padding for different screen sizes
      backgroundColor="formContainer"
      boxShadow="0px 2px 8px 0px rgba(0,0,0,0.2)"
      rounded="md"
    >
      {!scores && (
        <Flex justifyContent={"center"} alignItems={"center"}>
          <Spinner size="md" m={"medium"} /> {/* Adjust the spinner size */}
        </Flex>
      )}
      {scores && !scores.length ? (
        <Flex justifyContent={"center"} alignItems={"center"}>
          <Text m={"medium"}>No scores to display</Text>
        </Flex>
      ) : (
        <Table variant="simple" rounded="medium">
          <Tbody>
            {scores &&
              scores
                .sort((a, b) => b.score - a.score)
                .slice(0, 10)
                .map((score, idx) => (
                  <Tr key={score.id}>
                    <Td>{idx + 1}.</Td>
                    <Td>{score.username}</Td>
                    <Td>{score.score}</Td>
                  </Tr>
                ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default ScoreDisplay;
