//パスワード変更画面
//吉澤

import { FormEvent, useState } from "react";
import { ValidatePassword } from "@/utils/Auth/ValidatePassword";
import { CheckPasswordMatch } from "@/utils/Auth/CheckPasswordMatch";
import { DoChangePassword } from "./doChangePassword";

/**
 *パスワードを変更するページの実体部分
 *
 * @returns 入力フォーム欄
 */
export const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState<string>("");
  const [touched, setTouched] = useState({
    oldPassword: false,
    newPassword: false,
    newPasswordConfirmation: false,
  });

  /**
   * フォームの入力欄にフォーカスが当たった際、そのフィールドをtrueに変更する
   *
   * @param field :string
   */
  const handleBlur = (field: string): void => {
    setTouched({ ...touched, [field]: true });
  };

  /**
   *古いパスワードの入力欄が変更した時のハンドラー
   *
   * @param string
   */
  const handleOldPassword = (oldPassword: string) => {
    setOldPassword(oldPassword);
  };

  /**
   *新しいパスワードの入力欄が変更した時のハンドラー
   *
   * @param string
   */
  const handleNewPasswordChange = (newPassword: string) => {
    setNewPassword(newPassword);
  };

  /**
   *新しいパスワード（再入力）の入力欄が変更した時のハンドラー
   *
   * @param string
   */
  const handleNewPasswordConfirmation = (newPasswordConfirmation: string) => {
    setNewPasswordConfirmation(newPasswordConfirmation);
  };

  /**
   *新しいパスワードを変更するための処理
   *
   * @param FormEvent<HTMLFormElement>
   */
  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const result = DoChangePassword(oldPassword, newPassword);
    console.log(result);
  }

  return (
    <>
      <form method={"post"} onSubmit={handleSubmit}>
        <label>
          <br />
          現在のパスワード
          <input
            type="password"
            onBlur={() => handleBlur("oldPassword")}
            value={oldPassword}
            onChange={(e) => handleOldPassword(e.target.value)}
          ></input>
        </label>
        <label>
          <br />
          新しいパスワード
          <input
            type="password"
            onBlur={() => handleBlur("newPassword")}
            onChange={(e) => handleNewPasswordChange(e.target.value)}
            value={newPassword}
          ></input>
          {newPassword && !ValidatePassword(newPassword) && (
            <span>パスワードは8文字以上かつ、大文字小文字を使用してください</span>
          )}
        </label>
        <label>
          <br />
          新しいパスワード（再度入力）
          <input
            type="password"
            onBlur={() => handleBlur("newPasswordConfirmation")}
            onChange={(e) => handleNewPasswordConfirmation(e.target.value)}
            value={newPasswordConfirmation}
          ></input>
          {newPasswordConfirmation && !CheckPasswordMatch(newPassword, newPasswordConfirmation) && (
            <span>同じ値を入力してください。</span>
          )}
        </label>
        <label>
          <br />
          <button
            type="submit"
            disabled={
              !oldPassword ||
              !newPassword ||
              !newPasswordConfirmation ||
              !ValidatePassword(newPassword) ||
              !CheckPasswordMatch(newPassword, newPasswordConfirmation)
            }
          >
            登録
          </button>
        </label>
      </form>
    </>
  );
};
