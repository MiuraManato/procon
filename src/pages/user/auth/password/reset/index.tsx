import { PasswordReset } from "@/features/User/Authentication/PasswordReset";
import { UserHeader } from "@/components/User/Header";

const PasswordResetPage = () => {
  return (
    <div>
      <UserHeader />
      <PasswordReset />
    </div>
  );
};

export default PasswordResetPage;
