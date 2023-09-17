import Link from "next/link";
import { useState, useEffect } from "react";

import { Spinner } from "components";
import { scoreService } from "services";

export default Index;

function Index() {
  const [scores, setScores] = useState(null);

  useEffect(() => {
    scoreService.getAll().then((x) => setScores(x));
  }, []);

  return (
    <>
      <h1>Game</h1>
    </>
  );
}
