import { FormEvent, useEffect, useState } from "react";
import { ValidateEmail } from "@/utils/Auth/ValidateEmail";
import useAuth from "@/features/hooks/useAuth";
import Head from "next/head";
import Link from "next/link";
import router from "next/router";
import { User } from "@prisma/client";

export const EditProfile = () => {
  const [id, setId] = useState<string>("");
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

  const user = useAuth();
  useEffect(() => {
    if (user == null || user.uid == null) {
      window.location.href = "/user/auth/login";
      return;
    }
    const fetchUser = async () => {
      const userData: User = await fetch(`/api/user/${user.uid}`).then((res: Response): Promise<User> => res.json());
      setId(user.uid);
      setFirstName(userData.firstName);
      setLastName(userData.lastName);
      setAge(userData.age);
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

  const handleAgeChange = (age: number): void => {
    setAge(age);
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
    if (res.status === 200) {
      await router.push("/user/auth/edit-profile/complete");
    } else {
      throw new Error("情報変更に失敗しました。時間をあけ、再度お試しください。");
    }
  };

  return (
    <>
      <Head>
        <title>プロフィール編集</title>
      </Head>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form method="post" onSubmit={handleSubmit}>
        <label>
          名前
          <input
            type="text"
            value={firstName}
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
          disabled={!id || !firstName || !lastName || !age || !email || !ValidateEmail(email)}
          onClick={() => console.log(id, firstName, lastName, age, email)}
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
