import { useRouter } from "next/router";
import { useState } from "react";
import { doLogin } from "./doLogin";

import styles from "./index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });
  const router = useRouter();

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const loginSuccess = await doLogin(email, password);
      if (loginSuccess) {
        await router.push("/user/top");
      } else {
        setLoginError("メールアドレスまたはパスワードが間違っています。");
      }
    } catch (err) {
      if (err instanceof Error) {
        setLoginError(err.message);
      } else {
        console.error(err);
        setLoginError("ログイン中にエラーが発生しました。時間をあけ、再度実行してください。");
      }
    }
  };

  return (
    <>
      <div className={styles.base}>
        {loginError && <div>{loginError}</div>}
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.email}>
            <div>メールアドレス</div>
            <input
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              onBlur={() => setTouched({ ...touched, email: true })}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            {touched.email && !email && <span className={styles.invalid}>メールアドレスを入力してください</span>}
          </label>
          <br />
          <label className={styles.password}>
            <div>パスワード</div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="current-password"
              value={password}
              onBlur={() => setTouched({ ...touched, password: true })}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" onClick={togglePasswordVisibility}>
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </button>

            <br />
            {touched.password && !password && <span className={styles.invalid}>パスワードを入力してください</span>}
            <div>
              <Link href={"/user/auth/password/reset"}>パスワードを忘れた場合</Link>
            </div>
          </label>
          <br />

          <button type="submit" disabled={!email || !password}>
            ログイン
          </button>
        </form>
      </div>
    </>
  );
};
