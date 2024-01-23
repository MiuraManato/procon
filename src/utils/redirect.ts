import router from "next/router";
import { useEffect } from "react";

export const RedirectToHome = () => {
  useEffect(() => {
    router.push("/user/top").catch((err) => console.error(err));
  }, []);
};
