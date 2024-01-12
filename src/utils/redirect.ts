import router from "next/router";
import { useEffect } from "react";

export const RedirectToHome = () => {
  useEffect(() => {
    router.push("/user/auth/login").catch((err) => console.error(err));
  }, []);
};
