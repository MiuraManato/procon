//パスワード変更画面
//吉澤
import { useState } from "react";

export const PasswordChange = () => {
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState<string>("");

  const handleOldPasswordConfirmation = (oldPassword: string) => {
    setOldPassword(oldPassword);
  };

  const handleNewPasswordChange = (newPassword: string) => {
    setNewPassword(newPassword);
  };

  const handleNewPasswordConfirmation = (newPasswordConfirmation: string) => {
    setNewPasswordConfirmation(newPasswordConfirmation);
  };

  return (
    <>
      <form>
        <label>
          現在のパスワード
          <input
            type="password"
            value="{password}"
            onChange={(e) => handleOldPasswordConfirmation(e.target.value)}
          ></input>
        </label>
        <label>
          新しいパスワード
          <input type="password" value="{password}" onChange={(e) => handleNewPasswordChange(e.target.value)}></input>
        </label>
        <label>
          新しいパスワード（再度入力）
          <input type="password" value="{password}" onChange={(e) => handleNewPasswordConfirmation(e.target.value)}></input>
        </label>
      </form>
    </>
  );
};
