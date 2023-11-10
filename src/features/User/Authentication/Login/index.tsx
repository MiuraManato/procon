import { useRouter } from "next/router";
import { useState } from "react";
import { doLogin } from "./doLogin";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleEmailChange = (email: string) => {
    setEmail(email);
  };

  const handlePasswordChange = (password: string) => {
    setPassword(password);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    doLogin(email, password)
      .then(async (res) => {
        if (res) {
          await router.push("/user");
        } else {
          throw new Error("ログインに失敗しました");
        }
      })
      .catch((err: Error) => {
        throw new Error(err.message);
      });
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            メールアドレス
            <input
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
            />
          </label>
          <label>
            パスワード
            <input
              type="password"
              name="password"
              autoComplete="password"
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
            />
          </label>
          <button type="submit">ログイン</button>
        </form>
      </div>
    </>
  );
};
