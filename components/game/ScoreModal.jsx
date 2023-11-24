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

  const DetermineGameType = () => {
    const router = useRouter();
    const { pathname } = router;

    let gameType = "";

    if (pathname.startsWith("/game")) {
      gameType = "regular";
    } else if (pathname.startsWith("/prime")) {
      gameType = "prime";
    } else if (pathname.startsWith("/fibonacci")) {
      gameType = "fibonacci";
    }

    return gameType;
  };

  const gameType = DetermineGameType();

  console.log("Game type:", gameType);

  const createScore = (score) => {
    return scoreService
      .create(score, gameType)
      .then(() => {
        toast({
          title: "Success",
          description: "New score added",
          status: "success",
          duration: 3000,
          position: "top",
          isClosable: true,
        });
        console.log("GAMETYPE===", gameType);

        setTimeout(() => {
          console.log("GAMETYPE===", gameType);
          if (gameType === "regular") {
            router.push("/highscore");
          } else if (gameType == "prime") {
            router.push("/primehighscore");
          } else if (gameType === "fibonacci") {
            router.push("/fibhighscore");
          }
        }, 1000);
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
            w={"50%"}
            h={"2xlarge"}
            my={"xxlarge"}
            px={"medium"}
            justifyContent={"space-between"}
            rightIcon={
              <ArrowForwardIcon
                h={"large"}
                w={"large"}
                color={"formButtonText"}
              />
            }
            onClick={() => {
              createScore({
                score,
                username: userService.userValue?.username,
                gameType,
              });
              modalController.onClose();
            }}
          >
            <Text fontSize={"medium"} color={"formButtonText"}>
              Submit score
            </Text>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ScoreModal;
