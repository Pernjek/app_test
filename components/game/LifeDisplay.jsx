import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

import heartIcon from "../../public/images/heart.svg";
import Image from "next/image";

const LifeDisplay = ({ lives }) => {
  let arr = Array(lives).fill(0);
  return (
    <Flex flexDir={"row"} mb={"medium"} mt={"medium"} alignItems={"center"}>
      <Text fontWeight={"bold"} mb={"xxsmall"} mr={"xsmall"}>
        Lives:
      </Text>
      {arr.map((_, idx) => {
        return (
          <Box key={idx} pr={"xsmall"}>
            <Image alt="heart" src={heartIcon} height={20} />
          </Box>
        );
      })}
    </Flex>
  );
};

export default LifeDisplay;
