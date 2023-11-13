import { useState, useEffect } from "react";
import { PageLayout } from "components/shared/PageLayout";
import { PageTitle } from "components/shared/PageTitle";
import { Box, Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import NumberInput from "components/game/NumberInput";
import LifeDisplay from "components/game/LifeDisplay";
import NumberDisplay from "components/game/NumberDisplay";
import ScoreModal from "components/game/ScoreModal";

const LIVES = 10;
const NUMBER_MAX = 4181;

function generateRandomFibonacci(min, max) {
  let fibArr = [1, 1];
  while (true) {
    const nextFib = fibArr[fibArr.length - 1] + fibArr[fibArr.length - 2];
    if (nextFib <= max) {
      fibArr.push(nextFib);
    } else {
      break;
    }
  }
  const randomIndex = Math.floor(Math.random() * fibArr.length);
  return fibArr[randomIndex];
}

// Usage example

export default function Index() {
  const modalController = useDisclosure();

  const [secretNumber, setSecretNumber] = useState(
    generateRandomFibonacci(1, NUMBER_MAX)
  );

  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());

  const [message, setMessage] = useState("Start guessing...");
  const [userGuess, setUserGuess] = useState("");

  const [backgroundColor, setBackgroundColor] = useState("#f0f0f0");

  const [lives, setLives] = useState(LIVES);

  const handleNumberInputChange = (value) => {
    setBackgroundColor("#f0f0f0");
    setUserGuess(value);
  };

  const displayMessage = (message) => {
    setMessage(message);
  };

  const checkGuess = () => {
    const guess = Number(userGuess);

    if (!guess) {
      displayMessage("⛔️ No number!");
    } else if (guess === secretNumber) {
      displayMessage("🎉 Correct Number!");
      setBackgroundColor("lightgreen");

      console.log(1000 / (Date.now() - startTime), lives);
      const score = Math.round(
        (1000 / (Date.now() - startTime)) * lives * 1000
      );
      setScore(score);
      modalController.onOpen();
    } else if (guess !== secretNumber) {
      if (lives > 1) {
        displayMessage(guess > secretNumber ? "📈 Too high!" : "📉 Too low!");
        setBackgroundColor(guess > secretNumber ? "lightblue" : "orange");
        setLives(lives - 1);
      } else {
        displayMessage("💥 You lost the game!");
        setBackgroundColor("red");
        setLives(0);
      }
    }
  };

  const restartGame = () => {
    setStartTime(Date.now());
    setSecretNumber(generateRandomFibonacci(1, NUMBER_MAX));
    displayMessage("Start guessing...");
    setUserGuess("");
    setBackgroundColor("#f0f0f0");
    setLives(LIVES);
  };
  console.log("Fibonacci number is", secretNumber);

  useEffect(() => {}, [secretNumber]);

  return (
    <>
      <PageLayout>
        <PageTitle title={"Fibonacci Game"} p={4}/>
        <Box
          px={{ base: "10%", md: "20%" }}
          py={{ base: "customLarge", md: "2customLarge" }}
          backgroundColor="formContainer"
          boxShadow="0px 2px 8px 0px rgba(0,0,0,0.2)"
          rounded="md"
          mb="small"
        >
          <Flex
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Box>
              <Text fontWeight={"bold"}>Guess the Fibonacci Number!</Text>
              <Text>Between 1 and {NUMBER_MAX}</Text>
            </Box>
            <Button onClick={restartGame}>Reset!</Button>
          </Flex>

          <LifeDisplay lives={lives} />
          <NumberDisplay
            userGuess={userGuess}
            message={message}
            backgroundColor={backgroundColor}
          />
          <NumberInput
            value={userGuess}
            onChange={handleNumberInputChange}
            onSendClick={checkGuess}
          />
        </Box>
      </PageLayout>
      <ScoreModal score={score} modalController={modalController} />
    </>
  );
}
