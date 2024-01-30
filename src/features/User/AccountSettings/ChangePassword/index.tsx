import { FormEvent, useState } from "react";
import { ValidatePassword } from "@/utils/Auth/ValidatePassword";
import { CheckPasswordMatch } from "@/utils/Auth/CheckPasswordMatch";
import { doChangePassword } from "./doChangePassword";
import useAuth from "@/features/hooks/useAuth";
import router from "next/router";
import Head from "next/head";
import styles from "./index.module.css";

/**
 *パスワードを変更するページの実体部分
 *
 * @returns 入力フォーム欄
 */
export const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState<string>("");
  const [changePasswordError, setChangePasswordError] = useState("");
  const [touched, setTouched] = useState({
    oldPassword: false,
    newPassword: false,
    newPasswordConfirmation: false,
  });

  const user = useAuth();

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
  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    if (!user) {
      setChangePasswordError("ログインしていません。");
      return;
    }
    try {
      await doChangePassword(oldPassword, newPassword)
        .then(async (res) => {
          res
            ? await router.push("/user/account")
            : setChangePasswordError("パスワードが間違っています。お確かめ下さい。");
        })
        .catch((e: Error) => {
          console.error(e);
        });
    } catch (err) {
      console.error(err);
      setChangePasswordError("パスワード変更中にエラーが発生しました。時間をあけ、再度実行してください。");
    }
  };

  return (
    <>
      <Head>
        <title>パスワード変更</title>
      </Head>
      {changePasswordError && <div>{changePasswordError}</div>}
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <h1 className={styles.title}>パスワード変更</h1>
      <div className={styles.base}>
        <form method={"post"} onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>
            <br />
            <div className={styles["label-text"]}>現在のパスワード</div>
            <input
              type="password"
              onBlur={() => handleBlur("oldPassword")}
              value={oldPassword}
              onChange={(e) => handleOldPassword(e.target.value)}
            ></input>
          </label>
          <label className={styles.label}>
            <br />
            <div className={styles["label-text"]}>新しいパスワード</div>
            <input
              type="password"
              onBlur={() => handleBlur("newPassword")}
              onChange={(e) => handleNewPasswordChange(e.target.value)}
              value={newPassword}
            ></input>
            {newPassword && !ValidatePassword(newPassword) && (
              <span className={styles.span}>パスワードは8文字以上かつ、大文字小文字を使用してください</span>
            )}
          </label>
          <label className={styles.label}>
            <br />
            <div className={styles["label-text"]}>新しいパスワード（再度入力）</div>
            <input
              type="password"
              onBlur={() => handleBlur("newPasswordConfirmation")}
              onChange={(e) => handleNewPasswordConfirmation(e.target.value)}
              value={newPasswordConfirmation}
            ></input>
            {newPasswordConfirmation && !CheckPasswordMatch(newPassword, newPasswordConfirmation) && (
              <span className={styles.span}>同じ値を入力してください。</span>
            )}
          </label>
          <br />
          <button
            type="submit"
            className={styles.button}
            disabled={
              !oldPassword ||
              !newPassword ||
              !newPasswordConfirmation ||
              !ValidatePassword(newPassword) ||
              !CheckPasswordMatch(newPassword, newPasswordConfirmation)
            }
          >
            変更
          </button>
        </form>
      </div>
    </>
  );
};
