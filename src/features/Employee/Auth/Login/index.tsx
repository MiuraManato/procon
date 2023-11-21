import { useState } from "react";
import styles from "./index.module.css";
import { useRouter } from "next/router";
import { ValidateEmail } from "@/utils/Auth/ValidateEmail";
import { ValidatePassword } from "@/utils/Auth/ValidatePassword";
import { doEmployeeLogin } from "./doEmployeeLogin";

export const EmployeeLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });
  const router = useRouter();

  const handleSetEmail = (email: string) => {
    setEmail(email);
  };

  const handleBlur = (field: "email" | "password") => {
    setTouched({ ...touched, [field]: true });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const loginSuccess = await doEmployeeLogin(email, password);
      if (loginSuccess) {
        await router.push("/employee");
      } else {
        setLoginError("ログインに失敗しました");
      }
    } catch (error) {
      if (error instanceof Error) {
        setLoginError(error.message);
      } else {
        setLoginError("ログインに失敗しました。");
      }
    }
  };

  return (
    <>
      <div className={styles["container"]}>
        <div className={styles["form-container"]}>
          <div className={styles["form-title"]}>
            <h1>従業員ログイン</h1>
          </div>
          <div className={styles["form-content"]}>
            {loginError && <p>{loginError}</p>}
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <form onSubmit={handleSubmit}>
              <div className={styles["form-group"]}>
                <label htmlFor="email">
                  従業員メールアドレス
                  <input
                    type="email"
                    id="email"
                    onBlur={() => handleBlur("email")}
                    onChange={(e) => handleSetEmail(e.target.value)}
                  />
                  {touched.email && !email && <span>メールアドレスを入力してください</span>}
                </label>
              </div>
              <div className={styles["form-group"]}>
                <label htmlFor="password">
                  パスワード
                  <input
                    type="password"
                    id="password"
                    onBlur={() => handleBlur("password")}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {touched.password && !password && <span>パスワードを入力してください</span>}
                </label>
              </div>
              <div className={styles["form-group"]}>
                <button
                  type="submit"
                  disabled={!email || !password || !ValidateEmail(email) || !ValidatePassword(password)}
                >
                  ログイン
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
