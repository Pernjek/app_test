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
import ScoreDisplay from "components/game/ScoreDisplay";

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
      <ScoreDisplay scores={scores} />
    </PageLayout>
  );
}
