import { useState, useEffect } from "react";
import { scoreService } from "services";
import { PageLayout } from "components/shared/PageLayout";
import { PageTitle } from "components/shared/PageTitle";
import { Box } from "@chakra-ui/react";

export default Index;

function Index() {
  const secretNumber = Math.trunc(Math.random() * 100) + 1;

  const [guess, setGuess] = useState("");

  useEffect(() => {}, []);

  function create(score) {
    return scoreService
      .create(score)
      .then(() => {
        toast({
          title: "Success",
          description: "New score added",
          status: "success",
          duration: 3000,
          position: "top",
          isClosable: true,
        });
        scoreService.getAll().then((x) => setScores(x));
      })
      .catch(() =>
        toast({
          title: "Error",
          description: "Error on score",
          status: "error",
          duration: 3000,
          position: "top",
          isClosable: true,
        })
      );
  }

  return (
    <PageLayout>
      <PageTitle title={"Game"} />
      <Box
        px={{ base: "10%", md: "20%" }}
        py={{ base: "customLarge", md: "2customLarge" }}
        backgroundColor="formContainer"
        boxShadow="0px 2px 8px 0px rgba(0,0,0,0.2)"
        rounded="md"
      >
        {/* <LifeDisplay />
        <ScoreDisplay />
        <MessageDisplay />
        <NumberInput /> */}
      </Box>
    </PageLayout>
  );
}
