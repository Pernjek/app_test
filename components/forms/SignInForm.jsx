import Link from "next/link";
import { useState } from "react";
import {
  Input,
  Button,
  Box,
  FormControl,
  FormErrorMessage,
  VStack,
  FormLabel,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useToast } from "@chakra-ui/react";
import { userService } from "services";

export const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);
  const toast = useToast();
  const router = useRouter();

  // form validation rules
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  function onSubmit({ username, password }) {
    return userService
      .login(username, password)
      .then(() => {
        // get return url from query parameters or default to '/'
        const returnUrl = router.query.returnUrl || "/";
        router.push(returnUrl);
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: err,
          status: "error",
          duration: 3000,
          position: "top",
          isClosable: true,
        });
      });
  }

  console.log(errors)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={5}>
        <FormControl isInvalid={errors.username}>
          <FormLabel fontSize={"medium"} color={"grayText"}>
            Username
          </FormLabel>
          <motion.div
            whileHover={{
              scale: 1.01,
              boxShadow: "0px 0px 4px grayText",
            }}
          >
            <Input
              id="username"
              placeholder={"Username..."}
              rounded="sm"
              size="lg"
              {...register("username", {
                required: "Username is required",
                minLength: { value: 3, message: "Minimum length should be 3" },
              })}
            />
          </motion.div>

          <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.password}>
          <FormLabel fontSize={"medium"} color={"grayText"}>
            Password
          </FormLabel>
          <motion.div
            whileHover={{
              scale: 1.01,
              boxShadow: "0px 0px 4px grayText",
            }}
          >
            <InputGroup>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder={"Password..."}
                rounded="sm"
                size="lg"
                {...register("password", {
                  required: "This is required",
                  minLength: {
                    value: 4,
                    message: "Minimum length should be 4",
                  },
                })}
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="2large"
                  mr="xxsmall"
                  mt="xsmall"
                  size="sm"
                  onClick={handleShowClick}
                >
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </motion.div>
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
      </VStack>
      <Button
        w={"50%"}
        h={"2xlarge"}
        my={"xxlarge"}
        px={"medium"}
        rounded={"sm"}
        bg={"formButton"}
        justifyContent={"space-between"}
        isLoading={isSubmitting}
        rightIcon={
          <ArrowForwardIcon h={"large"} w={"large"} color={"formButtonText"} />
        }
        type="submit"
      >
        <Text fontSize={"medium"} color={"formButtonText"}>
          Login
        </Text>
      </Button>
      <Box
        borderTop={"1px"}
        borderColor={"lightGrayBorder"}
        pt={"xsmall"}
        flexDirection={"row"}
      >
        <Text fontSize={"large"} fontWeight={"bold"}>
          Don't have an account?
        </Text>
        <Link color="teal.500" href="/account/register">
          <Text textDecor={"underline"} fontSize={"medium"}>
            Register here
          </Text>
        </Link>
      </Box>
    </form>
  );
};
