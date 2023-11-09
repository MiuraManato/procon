import { FormEvent, useState } from "react";
import { ValidatePassword } from "@/utils/Auth/ValidatePassword";
import { CheckPasswordMatch } from "@/utils/Auth/CheckPasswordMatch";
import { ValidateEmail } from "@/utils/Auth/ValidateEmail";

export const Signup = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [touched, setTouched] = useState({
    email: false,
    password: false,
    passwordConfirmation: false,
  });

  const handleBlur = (field: string): void => {
    setTouched({ ...touched, [field]: true });
  };

  const handleEmailChange = (email: string): void => {
    setEmail(email);
  };

  const handlePasswordChange = (password: string): void => {
    setPassword(password);
  };

  const handlePasswordConfirmation = (passwordConfirmation: string): void => {
    setPasswordConfirmation(passwordConfirmation);
  };

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    // TODO: ユーザー登録処理
  }

  return (
    <>
      <form method={"post"} onSubmit={handleSubmit}>
        <label>
          メールアドレス
          <input
            type="email"
            value={email}
            onBlur={() => handleBlur("email")}
            onChange={(e) => handleEmailChange(e.target.value)}
          />
          {touched.email && email && !ValidateEmail(email) && <span>メールアドレスの形式が正しくありません</span>}
        </label>
        <br />
        <label>
          パスワード
          <input
            type="password"
            value={password}
            onBlur={() => handleBlur("password")}
            onChange={(e) => handlePasswordChange(e.target.value)}
          />
          {touched.password && password && !ValidatePassword(password) && (
            <span>パスワードは8文字以上で入力してください</span>
          )}
        </label>
        <br />
        <label>
          パスワード再入力
          <input
            type="password"
            value={passwordConfirmation}
            onBlur={() => handleBlur("passwordConfirmation")}
            onChange={(e) => handlePasswordConfirmation(e.target.value)}
          />
          {touched.passwordConfirmation &&
            passwordConfirmation &&
            !CheckPasswordMatch(password, passwordConfirmation) && <span>パスワードが一致しません</span>}
        </label>
        <br />
        <button
          type="submit"
          disabled={
            !email ||
            !password ||
            !passwordConfirmation ||
            !ValidateEmail(email) ||
            !ValidatePassword(password) ||
            !CheckPasswordMatch(password, passwordConfirmation)
          }
        >
          登録
        </button>
      </form>
    </>
  );
};
