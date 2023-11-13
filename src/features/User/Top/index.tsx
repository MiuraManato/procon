import Head from "next/head";
import Link from "next/link";

export const Top = () => {
  return (
    <>
      <Head>
        <title>TOP画面</title>
      </Head>
      <div>
        <div>
          <Link href={`/user/account`}>アカウント情報</Link>
        </div>
        <div>
          <Link href={`/user/order-history`}>過去の注文履歴</Link>
        </div>
        <div>
          <Link href={`/user/qr`}>QRコード表示</Link>
        </div>
        <div>
          <Link href={`/user/settings/like`}>好きな食べ物設定</Link>
        </div>
        <div>
          <Link href={`/user/settings/dislike`}>嫌いな食べ物設定</Link>
        </div>
        <div>
          <Link href={`/user/settings/allergy`}>アレルギー設定</Link>
        </div>
      </div>
    </>
  );
};
