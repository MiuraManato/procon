import { FormEvent, useState } from "react";
import { ValidatePassword } from "@/utils/Auth/ValidatePassword";
import { CheckPasswordMatch } from "@/utils/Auth/CheckPasswordMatch";
import { ValidateEmail } from "@/utils/Auth/ValidateEmail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { doSignup } from "./doSignup";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";

export const Signup = () => {
  const [username, setUsername] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [touched, setTouched] = useState({
    username: false,
    firstName: false,
    lastName: false,
    age: false,
    email: false,
    password: false,
    passwordConfirmation: false,
  });

  const router = useRouter();

  const handleUsernameChange = (username: string): void => {
    setUsername(username);
  };

  const handleFirstNameChange = (firstName: string): void => {
    setFirstName(firstName);
  };

  const handleLastNameChange = (lastName: string): void => {
    setLastName(lastName);
  };

  const handleAgeChange = (age: number): void => {
    setAge(age);
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

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  const handleBlur = (field: string): void => {
    setTouched({ ...touched, [field]: true });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    doSignup(email, password)
      .then(async (uid) => {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ uid, username, firstName, lastName, age, email }),
        });
        if (res.status === 200) {
          await router.push("/user/auth/signup/complete");
        } else {
          throw new Error("ユーザー登録に失敗しました。時間をあけ、再度お試しください。");
        }
      })
      .catch((e: Error) => {
        alert(e.message);
      });
  };

  return (
    <>
      <Head>
        <title>ユーザー登録</title>
      </Head>
      <form method={"post"} onSubmit={handleSubmit}>
        <label>
          ユーザー名
          <input
            type="text"
            value={username}
            onBlur={() => handleBlur("username")}
            onChange={(e) => handleUsernameChange(e.target.value)}
          />
          {touched.username && !username && <span>ユーザー名を入力してください</span>}
        </label>
        <br />
        <label>
          名前
          <input
            type="text"
            value={lastName}
            onBlur={() => handleBlur("lastName")}
            onChange={(e) => handleLastNameChange(e.target.value)}
          />
          <input
            type="text"
            value={firstName}
            onBlur={() => handleBlur("firstName")}
            onChange={(e) => handleFirstNameChange(e.target.value)}
          />
          {touched.firstName && !firstName && touched.lastName && !lastName && <span>名前を入力してください</span>}
        </label>
        <br />
        <label>
          年齢
          <input
            type="number"
            value={age}
            onBlur={() => handleBlur("age")}
            onChange={(e) => handleAgeChange(Number(e.target.value))}
          />
          {touched.age && !age && <span>年齢を入力してください</span>}
        </label>
        <br />
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
            !username ||
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
      <div>
        <Link href={"/user/auth/login"}>ログインはこちら</Link>
      </div>
    </>
  );
};
