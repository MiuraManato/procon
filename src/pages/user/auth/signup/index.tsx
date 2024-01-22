import { Signup } from "@/features/User/Authentication/Signup/";
import { UserHeader } from "@/components/User/Header";

const SignupPage = () => {
  return (
    <div>
      <UserHeader />
      <Signup />
    </div>
  );
};

export default SignupPage;
