import { useRouter } from "next/router";
import { useEffect } from "react";

import { userService } from "services";

export default Home;

function Home() {
  const router = useRouter();

  useEffect(() => {
    if (userService.userValue) {
      router.push("/highscore");
    } else {
      router.push("/account/login");
    }
  }, [router]);

  return null;
}
