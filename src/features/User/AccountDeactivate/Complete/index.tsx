import Head from "next/head";
import router from "next/router";

export const Complete = () => {
  return (
    <>
      <Head>
        <title>退会完了</title>
      </Head>
      <h1>アカウントが削除されました。</h1>
      <h1>ご利用ありがとうございました。</h1>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <button onClick={async () => await router.push("/user/auth/edit-profile/complete")}>OK</button>
    </>
  );
};
