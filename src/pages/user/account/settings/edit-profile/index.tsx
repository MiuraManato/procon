import { EditProfile } from "@/features/User/AccountSettings/EditProfile";
import { UserHeader } from "@/components/User/Header";

const AccountInfoPage = () => {
  return (
    <div>
      <UserHeader />
      <EditProfile />
    </div>
  );
};

export default AccountInfoPage;
