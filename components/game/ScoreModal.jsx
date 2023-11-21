import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import { scoreService, userService } from "services";

const ScoreModal = ({ score, modalController }) => {
  const toast = useToast();
  const router = useRouter();

  const gameType = router.pathname === "/game" ? "fibonacci" : "prime";

  const handleGameType = () => {
    if (gameType === "fibonacci") {
      createFib({
        score,
        username: userService.userValue?.username,
      });
    } else if (gameType === "prime") {
      createPrime({
        score,
        username: userService.userValue?.username,
      });
    } else
      createScore({
        score,
        username: userService.userValue?.username,
      });
  };

  const createScore = (score) => {
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
        setTimeout(() => router.push("/highscore"), 1000);
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
  };

  const createPrime = (score) => {
    return scoreService
      .createPrime(score)
      .then(() => {
        toast({
          title: "Success",
          description: "New prime score added",
          status: "success",
          duration: 3000,
          position: "top",
          isClosable: true,
        });
        setTimeout(() => router.push("/primehighscore"), 1000); // Route for PrimeScore
      })
      .catch(() =>
        toast({
          title: "Error",
          description: "Error on prime score",
          status: "error",
          duration: 3000,
          position: "top",
          isClosable: true,
        })
      );
  };

  const createFib = (score) => {
    return scoreService
      .createFib(score)
      .then(() => {
        toast({
          title: "Success",
          description: "New Fibonacci score added",
          status: "success",
          duration: 3000,
          position: "top",
          isClosable: true,
        });
        setTimeout(() => router.push("/fibhighscore"), 1000); // Route for FibScore
      })
      .catch(() =>
        toast({
          title: "Error",
          description: "Error on Fibonacci score",
          status: "error",
          duration: 3000,
          position: "top",
          isClosable: true,
        })
      );
  };

  return (
    <Modal
      onClose={modalController.onClose}
      size={"lg"}
      isOpen={modalController.isOpen}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>You won!</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize={"large"}>Your score is {score}</Text>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            onClick={() => {
              createScore({
                score,
                username: userService.userValue?.username,
              });
              modalController.onClose();
            }}
          >
            Submit Score
          </Button>

          {/* Button for submitting prime score */}
          <Button
            colorScheme="green"
            onClick={() => {
              createPrime({
                score,
                username: userService.userValue?.username,
              });
              modalController.onClose();
            }}
          >
            Submit Prime Score
          </Button>

          {/* Button for submitting fibonacci score */}
          <Button
            colorScheme="purple"
            onClick={() => {
              createFib({
                score,
                username: userService.userValue?.username,
              });
              modalController.onClose();
            }}
          >
            Submit Fibonacci Score
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ScoreModal;
