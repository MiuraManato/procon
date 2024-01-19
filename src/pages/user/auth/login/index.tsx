import { UserHeader } from "@/components/User/Header";
import { Login } from "@/features/User/Authentication/Login";

const LoginPage = () => {
  return (
    <>
      <UserHeader />
      <Login />
    </>
  );
};

export default LoginPage;
