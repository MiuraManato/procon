import { CompleteWithdrawal } from "@/features/User/AccountDeactivate/Complete";
import { UserHeader } from "@/components/User/Header";

const CompleteWithdrawalPage = () => {
  return (
    <div>
      <UserHeader />
      <CompleteWithdrawal />
    </div>
  );
};

export default CompleteWithdrawalPage;
