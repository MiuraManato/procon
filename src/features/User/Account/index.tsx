import Head from "next/head";
import Link from "next/link";
import styles from "./index.module.css";

export const AccountInfo = () => {
  return (
    <>
      <Head>
        <title>アカウント情報</title>
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
