import { UserHeader } from "@/components/User/Header";
import { Login } from "@/features/User/Authentication/Login";

const LoginPage = () => {
  return(
    <div>
      <UserHeader />
      <Login />
    </div>
  )
};

export default LoginPage;
