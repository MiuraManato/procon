import Head from "next/head";
import router from "next/router";
import styles from "./index.module.css";

export const CompleteWithdrawal = () => {
  //ボタンを押したらログイン画面に遷移する処理
  const handleClick = async () => {
    await router.push("/user/auth/login");
  };
  return (
    <>
      <Head>
        <title>退会完了</title>
      </Head>
      <div className={styles.base}>
      <div className={styles["label-text"]}>アカウントが削除されました。</div>
      <div className={styles["label-text"]}>ご利用ありがとうございました。</div>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <button className={styles.button} onClick={handleClick}>トップへ</button>
      </div>
    </>
  );
};
