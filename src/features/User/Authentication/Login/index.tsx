import { useRouter } from "next/router";
import { useState } from "react";
import { doLogin } from "./doLogin";
import Head from "next/head";
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
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>ログイン | PersonalizedMenu</title>
      </Head>
      <div className={styles.base}>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.error}>{loginError && <div>{loginError}</div>}</div>
          <label className={styles.label}>
            <div className={styles["label-text"]}>メールアドレス</div>
            <div className={styles["email-form"]}>
              <input
                type="email"
                name="email"
                autoComplete="email"
                value={email}
                onBlur={() => setTouched({ ...touched, email: true })}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <br />
            {touched.email && !email && <span className={styles.span}>メールアドレスを入力してください</span>}
          </label>
          <br />
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
            <br />
            {touched.password && !password && <span className={styles.span}>パスワードを入力してください</span>}
          </label>
          <div className={styles["blank"]}></div>
          <div className={styles["link-forgot"]}>
            <Link href={"/user/auth/password/reset"} className={styles.link}>
              パスワードを忘れた場合
            </Link>
          </div>
          <br />
          <div className={styles.newline}>
            <button type="submit" disabled={!email || !password} className={styles.button}>
              ログイン
            </button>
          </div>
          <div className={styles.signuplink}>
            <Link href={"/user/auth/signup"} className={styles.link}>
              新規登録はこちら
            </Link>
          </div>
        </form>
      </div>
      {loading && (
        <div className={styles["login-modal"]}>
          <div>ログイン中です</div>
        </div>
      )}
    </>
  );
};
