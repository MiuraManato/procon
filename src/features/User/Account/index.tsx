import Head from "next/head";
import Link from "next/link";

export const AccountInfo = () => {
  return (
    <>
      <Head>
        <title>アカウント情報</title>
      </Head>
      <h1>アカウント情報</h1>
      <Link href={"/user/account/settings/edit-profile"}>アカウント情報変更</Link>
      <Link href={"/user/account/settings/change-password"}>パスワード変更</Link>
      <Link href={"/user/account/deactivate/confirm"}>退会</Link>
    </>
  );
};
