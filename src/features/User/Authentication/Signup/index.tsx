import { FormEvent, useState } from "react";
import { ValidatePassword } from "@/utils/Auth/ValidatePassword";
import { CheckPasswordMatch } from "@/utils/Auth/CheckPasswordMatch";
import { ValidateEmail } from "@/utils/Auth/ValidateEmail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";

export const Signup = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [touched, setTouched] = useState({
    email: false,
    password: false,
    passwordConfirmation: false,
  });

  const handleEmailChange = (email: string): void => {
    setEmail(email);
  };

  const handlePasswordChange = (password: string): void => {
    setPassword(password);
  };

  const handlePasswordConfirmation = (passwordConfirmation: string): void => {
    setPasswordConfirmation(passwordConfirmation);
  };

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  const handleBlur = (field: string): void => {
    setTouched({ ...touched, [field]: true });
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
            type={showPassword ? "text" : "password"}
            value={password}
            onBlur={() => handleBlur("password")}
            onChange={(e) => handlePasswordChange(e.target.value)}
          />
          <button type="button" onClick={togglePasswordVisibility}>
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
          </button>
          {touched.password && password && !ValidatePassword(password) && (
            <span>パスワードは小文字、大文字、数字を含む8文字以上にする必要があります。</span>
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
