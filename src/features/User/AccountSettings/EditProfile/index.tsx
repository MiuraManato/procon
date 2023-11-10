import Head from "next/head";
import Link from "next/link";

export const EditProfile = () => {
  return (
    <>
      <Head>
        <title>アカウント情報変更</title>
      </Head>
      <h1>アカウント情報変更</h1>
      <label htmlFor="name">名前</label>
      <input id="name" name="name" type="text" autoComplete="name" required />
      <label htmlFor="email">Eメール</label>
      <input id="email" name="email" type="email" autoComplete="email" required />
      <Link href={"/user/account"}>戻る</Link>
      <button type="submit">アカウント情報を保存</button>
    </>
  );
};
