import { useState } from "react";

export const Signup = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");

  const handleEmailChange = (email: string) => {
    setEmail(email);
  };

  const handlePasswordChange = (password: string) => {
    setPassword(password);
  };

  const handlePasswordConfirmation = (passwordConfirmation: string) => {
    setPasswordConfirmation(passwordConfirmation);
  };

  return (
    <>
      <form>
        <label>
          メールアドレス
          <input
            type="email"
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
          />
        </label>
        <label>
          パスワード
          <input
            type="password"
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
          />
        </label>
        <label>
          パスワード再入力
          <input
            type="password"
            value={passwordConfirmation}
            onChange={(e) => handlePasswordConfirmation(e.target.value)}
          />
        </label>
      </form>
    </>
  );
};
