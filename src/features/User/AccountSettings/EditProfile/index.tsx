import { FormEvent, useEffect, useState } from "react";
import { ValidateEmail } from "@/utils/Auth/ValidateEmail";
import useAuth from "@/features/hooks/useAuth";
import Head from "next/head";
import Link from "next/link";
import { User } from "@prisma/client";
import styles from "./index.module.css";

export const EditProfile = () => {
  const [id, setId] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    age: false,
    email: false,
  });
  const [editComplete, setEditComplete] = useState<boolean>(false);

  const user = useAuth();

  useEffect(() => {
    if (user === undefined) return;
    if (user === null) {
      window.location.href = "/user/auth/login";
      return;
    }
    const fetchUser = async () => {
      const userData: User = await fetch(`/api/user/${user.uid}`).then((res: Response): Promise<User> => res.json());
      setId(user.uid);
      setFirstName(userData.firstName);
      setLastName(userData.lastName);
      setAge(userData.age as unknown as string);
      setEmail(userData.email);
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchUser();
  }, [user]);

  const handleFirstNameChange = (firstName: string): void => {
    setFirstName(firstName);
  };

  const handleLastNameChange = (lastName: string): void => {
    setLastName(lastName);
  };

  const handleAgeChange = (value: string) => {
    if (value === "") {
      setAge("");
      return;
    }
    // 条件：0以上、整数
    if (Number(value) < 0 || Number(value) % 1 !== 0) {
      return;
    }
    // 条件：数字のみ
    if (value.match(/^[0-9]+$/) === null) {
      return;
    }
    // 先頭の0を削除
    if (value.startsWith("0")) {
      value = value.replace(/^0+/, "");
    }
    setAge(value);
  };

  const handleEmailChange = (email: string): void => {
    setEmail(email);
  };

  const handleBlur = (field: string): void => {
    setTouched({ ...touched, [field]: true });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    const res = await fetch("/api/auth/edit-profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, firstName, lastName, age, email }),
    });
    if (res.ok) {
      setEditComplete(true);
    } else {
      console.error(res);
      throw new Error("情報変更に失敗しました。時間をあけ、再度お試しください。");
    }
  };

  return (
    <>
      <Head>
        <title>プロフィール編集</title>
      </Head>
      <h1 className={styles.title}>アカウント情報変更</h1>
      <div className={styles.base}>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form method="post" onSubmit={handleSubmit} className={styles.form}>
          {editComplete && <p className={styles.complete}>変更が完了しました。</p>}
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              <div className={styles["label-text"]}>名前</div>
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
              {(!firstName || !lastName) && <span className={styles.span}>名前を入力してください</span>}
            </label>
          </div>
          <br />
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              <div className={styles["label-text"]}>年齢</div>
              <input
                type="text"
                inputMode="numeric"
                value={age}
                onBlur={() => handleBlur("age")}
                onChange={(e) => {
                  handleAgeChange(e.target.value);
                }}
              />
              {touched.age && !age && <span className={styles.span}>年齢を入力してください</span>}
            </label>
          </div>
          <br />
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              <div className={styles["label-text"]}>メールアドレス（変更不可）</div>
              <input
                type="email"
                value={email}
                onBlur={() => handleBlur("email")}
                onChange={(e) => handleEmailChange(e.target.value)}
                readOnly={true}
              />
              {touched.email && email && !ValidateEmail(email) && (
                <span className={styles.span}>メールアドレスの形式が正しくありません</span>
              )}
            </label>
          </div>
          <br />
          <button
            type="submit"
            className={styles.button}
            disabled={!id || !firstName || !lastName || !age || !email || !ValidateEmail(email)}
          >
            情報を保存する
          </button>
          <div className={styles.linkContainer}>
            <Link href={`/user/account`} className={styles.link}>戻る</Link>
          </div>
        </form>
      </div>
    </>
  );
};
