import { PageLayout } from "components/shared/PageLayout";
import { PageTitle } from "components/shared/PageTitle";
import { SignInForm } from "components/forms/SignInForm";
import { Box } from "@chakra-ui/react";
import { userService } from "services";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default Login;

function Login() {
  const router = useRouter();
  useEffect(() => {
    if (userService.userValue) {
      router.push("/game");
    }
  }, [router]);

  return (
    <PageLayout>
      <PageTitle title={"Login"} />
      <Box
        px={{ base: "10%", md: "20%" }}
        py={{ base: "customLarge", md: "2customLarge" }}
        backgroundColor="formContainer"
        boxShadow="0px 2px 8px 0px rgba(0,0,0,0.2)"
        rounded="md"
      >
        <SignInForm />
      </Box>
    </PageLayout>
  );
}
