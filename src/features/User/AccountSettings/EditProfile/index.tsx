import { FormEvent, useState } from "react";
import { ValidateEmail } from "@/utils/Auth/ValidateEmail";
import Head from "next/head";
import Link from "next/link";

export const EditProfile = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    age: false,
    email: false,
  });

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

  const handleBlur = (field: string): void => {
    setTouched({ ...touched, [field]: true });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    // ここでプロフィールの更新処理を行う
    // 更新が成功したら適切なリダイレクトやメッセージを表示する
  };

  return (
    <>
      <Head>
        <title>プロフィール編集</title>
      </Head>
      <form method="post" onSubmit={handleSubmit}>
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
        <button
          type="submit"
          disabled={!firstName || !lastName || !age || !email || !ValidateEmail(email)}
          onClick = {() => console.log(firstName, lastName, age, email)}
        >
          情報を保存する
        </button>
      </form>
      <div>
        <Link href={`/user/account`}>戻る</Link>
      </div>
    </>
  );
};
