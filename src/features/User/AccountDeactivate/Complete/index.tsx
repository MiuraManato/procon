import Head from "next/head";
import router from "next/router";

export const Complete = () => {
  //ボタンを押したらログイン画面に遷移する処理
  const handleClick = async () => {
    await router.push("/user/auth/login");
  };
  return (
    <>
      <Head>
        <title>退会完了</title>
      </Head>
      <h1>アカウントが削除されました。</h1>
      <h1>ご利用ありがとうございました。</h1>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <button onClick={handleClick}>OK</button>
    </>
  );
};
