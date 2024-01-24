import Head from "next/head";
import Link from "next/link";
import useAuth from "@/features/hooks/useAuth";
import { useEffect, useState } from "react";

export const AccountInfo = () => {
  const [loading, setLoading] = useState<boolean>(true);

  const user = useAuth();
  useEffect(() => {
    if (user === undefined) return;
    if (user === null) {
      window.location.href = "/user/auth/login";
      return;
    }
    setLoading(false);
  }, [user]);

  if (loading) return <>Now loadging...</>;

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
