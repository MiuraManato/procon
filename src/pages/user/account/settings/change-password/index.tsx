//パスワード変更画面
//制作者：吉澤
import { ChangePassword } from "@/features/User/AccountSettings/ChangePassword";
import { UserHeader } from "@/components/User/Header";

export default function ChangePasswordPage() {
  return (
    <div>
      <UserHeader />
      <ChangePassword />
    </div>
  );
}
