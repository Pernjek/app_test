import { useState, useEffect } from "react";
import { scoreService } from "services";
import { useToast } from "@chakra-ui/react";
import { PageLayout } from "components/shared/PageLayout";
import { PageTitle } from "components/shared/PageTitle";
import ScoreDisplay from "components/game/ScoreDisplay";

export default Index;

function Index() {
  const [scores, setScores] = useState(null);
  const toast = useToast();

  useEffect(() => {
    scoreService.getAllFib().then((x) => setScores(x));
  }, []);

  return (
    <PageLayout>
      <PageTitle title={"Fibonacci Highscore"} />
      <ScoreDisplay scores={scores} />
    </PageLayout>
  );
}
