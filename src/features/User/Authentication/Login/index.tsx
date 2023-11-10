import { useRouter } from "next/router";
import { useState } from "react";
import { doLogin } from "./doLogin";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const router = useRouter();

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
      console.error(err);
      setLoginError("ログイン中にエラーが発生しました。後ほど再試行してください。");
    }
  };

  return (
    <>
      <div>
        {loginError && <div>{loginError}</div>}
        <form onSubmit={handleSubmit}>
          <label>
            <div>メールアドレス</div>
            <input
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <br />
          <label>
            <div>パスワード</div>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type="submit" disabled={!email || !password}>
            ログイン
          </button>
        </form>
      </div>
    </>
  );
};
