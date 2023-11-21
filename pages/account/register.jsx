import { PageLayout } from "components/shared/PageLayout";
import { PageTitle } from "components/shared/PageTitle";
import { RegisterForm } from "components/forms/RegisterForm";
import { Box } from "@chakra-ui/react";
import { userService } from "services";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default Register;

function Register() {
  const router = useRouter();
  useEffect(() => {
    if (userService.userValue) {
      router.push("/game");
    }
  }, [router]);

  return (
    <PageLayout>
      <PageTitle title={"Register"} alignItems={"center"}/>
      <Box
        px={{ base: "10%", md: "20%" }}
        py={{ base: "customLarge", md: "2customLarge" }}
        backgroundColor="formContainer"
        boxShadow="0px 2px 8px 0px rgba(0,0,0,0.2)"
        rounded="md"
      >
        <RegisterForm />
      </Box>
    </PageLayout>
  );
}
