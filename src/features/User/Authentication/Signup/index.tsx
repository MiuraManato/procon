import { FormEvent, useState } from "react";
import { ValidatePassword } from "@/utils/Auth/ValidatePassword";
import { CheckPasswordMatch } from "@/utils/Auth/CheckPasswordMatch";
import { ValidateEmail } from "@/utils/Auth/ValidateEmail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { doSignup } from "./doSignup";
import Head from "next/head";
import Link from "next/link";
import styles from "./index.module.css";

export const Signup = () => {
  // 入力を管理するstate
  const [username, setUsername] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  // 入力欄に一回でもフォーカスが当たったかどうかを管理するstate
  const [touched, setTouched] = useState({
    username: false,
    firstName: false,
    lastName: false,
    age: false,
    email: false,
    password: false,
    passwordConfirmation: false,
  });
  // ユーザー登録完了モーダルの表示を管理するstate
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  // 入力欄の変更を管理する関数
  const handleUsernameChange = (username: string): void => {
    setUsername(username);
  };

  // 入力欄の変更を管理する関数
  const handleFirstNameChange = (firstName: string): void => {
    setFirstName(firstName);
  };

  // 入力欄の変更を管理する関数
  const handleLastNameChange = (lastName: string): void => {
    setLastName(lastName);
  };

  // 入力欄の変更を管理する関数
  const handleAgeChange = (age: number): void => {
    setAge(age);
  };

  // 入力欄の変更を管理する関数
  const handleEmailChange = (email: string): void => {
    setEmail(email);
  };

  // 入力欄の変更を管理する関数
  const handlePasswordChange = (password: string): void => {
    setPassword(password);
  };

  // 入力欄の変更を管理する関数
  const handlePasswordConfirmation = (passwordConfirmation: string): void => {
    setPasswordConfirmation(passwordConfirmation);
  };

  // パスワード表示・非表示を管理する関数
  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  // フォーカスが外れた時にフォームのバリデーションを行う関数
  const handleBlur = (field: string): void => {
    setTouched({ ...touched, [field]: true });
  };

  // ユーザー登録完了モーダルを表示する関数
  const handleSetOpenModal = () => {
    setModalIsOpen(true);
  };

  // ユーザー登録を行う関数
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
          handleSetOpenModal();
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
      <div className={styles.body}>
        <form method="post" onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              <div className={styles["label-text"]}>ユーザー名</div>
              <div className={styles["input-box"]}>
                <input
                  type="text"
                  value={username}
                  onBlur={() => handleBlur("username")}
                  onChange={(e) => handleUsernameChange(e.target.value)}
                />
              </div>
              {touched.username && !username && <span className={styles.span}>ユーザー名を入力してください</span>}
            </label>
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              <div className={styles["label-text"]}>姓</div>
              <div className={styles["input-box"]}>
                <input
                  type="text"
                  value={lastName}
                  onBlur={() => handleBlur("lastName")}
                  onChange={(e) => handleLastNameChange(e.target.value)}
                />
              </div>
              <div className={styles["label-text"]}>名</div>
              <div className={styles["input-box"]}>
                <input
                  type="text"
                  value={firstName}
                  onBlur={() => handleBlur("firstName")}
                  onChange={(e) => handleFirstNameChange(e.target.value)}
                />
              </div>
              {touched.firstName && !firstName && touched.lastName && !lastName && (
                <span className={styles.span}>名前を入力してください</span>
              )}
            </label>
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              <div className={styles["label-text"]}>年齢</div>
              <div className={styles["input-box"]}>
                <input
                  type="number"
                  value={age}
                  onBlur={() => handleBlur("age")}
                  onChange={(e) => handleAgeChange(Number(e.target.value))}
                />
              </div>
              {touched.age && !age && <span className={styles.span}>年齢を入力してください</span>}
            </label>
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              <div className={styles["label-text"]}>メールアドレス</div>
              <div className={styles["input-box"]}>
                <input
                  type="email"
                  value={email}
                  onBlur={() => handleBlur("email")}
                  onChange={(e) => handleEmailChange(e.target.value)}
                />
              </div>
              {touched.email && email && !ValidateEmail(email) && (
                <span className={styles.span}>メールアドレスの形式が正しくありません</span>
              )}
            </label>
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              <div className={styles["label-text"]}>パスワード</div>
              <div className={styles["input-box"]}>
                <input
                  className={styles["form-input"]}
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onBlur={() => handleBlur("password")}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                />
                <button type="button" onClick={togglePasswordVisibility}>
                  <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </button>
              </div>
              {touched.password && password && !ValidatePassword(password) && (
                <span className={styles.span} style={{ whiteSpace: "pre-line" }}>
                  パスワードは小文字、大文字、数字を含む8文字以上にする必要があります。
                </span>
              )}
            </label>
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              <div className={styles["label-text"]}>パスワード再入力</div>
              <div className={styles["input-box"]}>
                <input
                  type="password"
                  value={passwordConfirmation}
                  onBlur={() => handleBlur("passwordConfirmation")}
                  onChange={(e) => handlePasswordConfirmation(e.target.value)}
                />
              </div>
              {touched.passwordConfirmation &&
                passwordConfirmation &&
                !CheckPasswordMatch(password, passwordConfirmation) && (
                  <span className={styles.span}>パスワードが一致しません</span>
                )}
            </label>
          </div>
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
            className={styles.button}
          >
            登録
          </button>
          <div className={styles.linkContainer}>
            <Link href={"/user/auth/login"} className={styles.link}>
              ログインはこちら
            </Link>
          </div>
        </form>
        {modalIsOpen && (
          <div className={styles["outside-modal"]}>
            <div className={styles["confirm-modal"]}>
              <p>ユーザー登録が完了しました。</p>
              <p>メールアドレス認証をした後、ログインをしてください。</p>
              <Link href={"/user/auth/login"} className={styles.link}>
                ログインはこちら
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
