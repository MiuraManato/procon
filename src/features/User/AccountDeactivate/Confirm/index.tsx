import { useState } from "react";
import { doWithdrawal } from "./doWithdrawal";
import { CompleteWithdrawal } from "../Complete";
import useAuth from "@/features/hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.css";
import Head from "next/head";

// 退会確認を行うReactコンポーネント
export const Withdrawal = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [withdrawalError, setWithdrawalError] = useState("");
  const [touched, setTouched] = useState({
    password: false,
  });
  const [withdrawalSuccess, setWithdrawalSuccess] = useState<boolean>(false);

  const user = useAuth();
  const uid = user?.uid || "";

  // フォームの送信ハンドラー
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // パスワードの確認を行い、成功したらサーバーに確認を送信
      const withdrawalSuccess = await doWithdrawal(password);
      if (withdrawalSuccess) {
        const res = await fetch("/api/auth/confirm", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ uid }),
        });

        // サーバーのステータスコードを確認し、成功ならば特定のページにリダイレクト
        if (res.status === 200) {
          setWithdrawalSuccess(true);
        } else {
          throw new Error("情報変更に失敗しました。時間をあけ、再度お試しください。");
        }
      } else {
        setWithdrawalError("パスワードが間違っています。");
      }
    } catch (err) {
      console.error(err);
      setWithdrawalError("退会中にエラーが発生しました。時間をあけ、再度実行してください。");
    }
  };

  // パスワード表示/非表示のトグル処理
  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  if (withdrawalSuccess) {
    return <CompleteWithdrawal />;
  }

  return (
    <>
      <Head>
        <title>退会確認 | PersonalizedMenu</title>
      </Head>
      <h1 className={styles.title}>退会確認</h1>
      {withdrawalError && <p>{withdrawalError}</p>}
      <div className={styles.base}>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>
            <div className={styles["label-text"]}>パスワード</div>
            <div className={styles["password-form"]}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="current-password"
                value={password}
                onBlur={() => setTouched({ ...touched, password: true })}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className={styles["show-password"]} type="button" onClick={togglePasswordVisibility}>
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
              </button>
            </div>
            {touched.password && !password && <span className={styles.span}>パスワードを入力してください</span>}
          </label>
          <button type="submit" disabled={!password} className={styles.button}>
            退会する
          </button>
        </form>
      </div>
    </>
  );
};
