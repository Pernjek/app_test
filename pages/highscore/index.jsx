import { useState, useEffect } from "react";
import { scoreService, userService } from "services";
import {
  Flex,
  useToast,
  Box,
  Table,
  Td,
  Tr,
  Spinner,
  Tbody,
  Text,
} from "@chakra-ui/react";
import { PageLayout } from "components/shared/PageLayout";
import { PageTitle } from "components/shared/PageTitle";

export default Index;

function Index() {
  const [scores, setScores] = useState(null);
  const toast = useToast();

  useEffect(() => {
    scoreService.getAll().then((x) => setScores(x));
  }, []);

  return (
    <PageLayout>
      <PageTitle title={"Highscore"} />
      <Box
        px={{ base: "10%", md: "20%" }}
        py={{ base: "customLarge", md: "2customLarge" }}
        backgroundColor="formContainer"
        boxShadow="0px 2px 8px 0px rgba(0,0,0,0.2)"
        rounded="md"
      >
        {!scores && (
          <Flex justifyContent={"center"} alignItems={"center"}>
            <Spinner size="lg" />
          </Flex>
        )}
        {scores && !scores.length ? (
          <Flex justifyContent={"center"} alignItems={"center"}>
            <Text>No scores to display</Text>
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
    </PageLayout>
  );
}
