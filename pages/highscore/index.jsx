import Link from "next/link";
import { useState, useEffect } from "react";

import { Nav, Spinner } from "components";
import { scoreService, userService } from "services";
import { Button, useToast } from "@chakra-ui/react";

export default Index;

function Index() {
  const [scores, setScores] = useState(null);
  const toast = useToast();

  useEffect(() => {
    scoreService.getAll().then((x) => setScores(x));
  }, []);

  function create(score) {
    return scoreService
      .create(score)
      .then(() => {
        toast({
          title: "Success",
          description: "Score added",
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
          description: "Error creating score",
          status: "error",
          duration: 3000,
          position: "top",
          isClosable: true,
        })
      );
  }

  return (
    <>
      <Nav />
      <h1>Highscore</h1>
      <Button
        onClick={() =>
          create({
            username: userService.userValue.username,
            score: Math.floor(Math.random() * 10000),
          })
        }
      >
        "Add score"
      </Button>
      {!scores && (
        <div>
          <Spinner />
        </div>
      )}

      {scores && !scores.length ? (
        <div>
          <td colSpan="4" className="text-center">
            <div className="p-2">No Scores To Display</div>
          </td>
        </div>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th style={{ width: "30%" }}>No.</th>
              <th style={{ width: "30%" }}>Username</th>
              <th style={{ width: "30%" }}>Score</th>
            </tr>
          </thead>
          <tbody>
            {scores &&
              scores
                .sort((a, b) => b.score - a.score)
                .slice(0, 30)
                .map((score, idx) => (
                  <tr key={score.id}>
                    <td>{idx + 1}.</td>
                    <td>{score.username}</td>
                    <td>{score.score}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      )}
    </>
  );
}
