import Head from "next/head";
import Link from "next/link";
import styles from "./index.module.css";
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

  if (loading) return <>Now loading...</>;

  return (
    <>
      <Head>
        <title>アカウント管理メニュー | PersonalizedMenu</title>
      </Head>
      <div className={styles.container}>
        <h1 className={styles.title}>アカウント情報</h1>
        <Link href={"/user/account/settings/edit-profile"} className={styles.link}>
          <div className={styles.btn}>アカウント情報変更</div>
        </Link>
        <Link href={"/user/account/settings/change-password"} className={styles.link}>
          <div className={styles.btn}>パスワード変更</div>
        </Link>
        <Link href={"/user/account/deactivate/confirm"} className={styles.link}>
          <div className={styles.btn}>退会</div>
        </Link>
      </div>
    </>
  );
};
