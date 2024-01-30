import { Withdrawal } from "@/features/User/AccountDeactivate/Confirm/";
import { UserHeader } from "@/components/User/Header";

const ConfirmWithdrawalPage = () => {
  return (
    <div>
      <UserHeader />
      <Withdrawal />
    </div>
  );
};
export default ConfirmWithdrawalPage;
