import { useRouter } from "next/router";
import { useState } from "react";
import { doLogin } from "./doLogin";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFailed, setIsFailed] = useState(false);
  const router = useRouter();

  const handleEmailChange = (email: string): void => {
    setEmail(email);
  };

  const handlePasswordChange = (password: string): void => {
    setPassword(password);
  };

  const handleSetIsFailedChange = (isFaile: boolean): void => {
    setIsFailed(isFaile);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    doLogin(email, password)
      .then(async (res) => {
        if (res) {
          await router.push("/user/top");
        } else {
          handleSetIsFailedChange(true);
        }
      })
      .catch((err: Error) => {
        throw new Error(err.message);
      });
  };

  return (
    <>
      <div>
        {isFailed && <div>ログインに失敗しました。</div>}
        <form onSubmit={handleSubmit}>
          <label>
            <div>メールアドレス</div>
            <input
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
            />
          </label>
          <br />
          <label>
            <div>パスワード</div>
            <input
              type="password"
              name="password"
              autoComplete="password"
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
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
