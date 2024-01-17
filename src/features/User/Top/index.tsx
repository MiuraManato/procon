import Head from "next/head";
import Link from "next/link";
import styles from "./index.module.css";
import QRCodeComponent from "@/components/User/QRCode";
import useAuth from "@/features/hooks/useAuth";
import { useEffect, useState } from "react";

export const Top = () => {
  const [uid, setUid] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  // QRコードモーダルの表示を管理するstate
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const user = useAuth();

  useEffect(() => {
    if (user === undefined) return;
    if (user === null) {
      window.location.href = "/user/auth/login";
      return;
    }
    setUid(user.uid);
    setLoading(false);
  }, [user]);

  // QRコードをクリックしたときにモーダルをオープンする関数
  const handleQRClick = () => {
    setModalIsOpen(true);
  };

  // QRコードモーダルを閉じる関数
  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const handleModalInsideClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  if (loading) return <div>Loading...</div>;
  return (
    <>
      <Head>
        <title>TOP画面</title>
      </Head>
      <header className={styles.header}>
        <h1 className={styles["store-name"]}>飲食店業務システム（仮）</h1>
        <div className={styles.link}>
          <Link href={`/user/account`} className={styles["link-font"]}>
            アカウント
          </Link>
          <Link href={`/user/settings/allergy`} className={styles["link-font"]}>
            アレルギー
          </Link>
          <Link href={`/user/settings/like`} className={styles["link-font"]}>
            好きな食べ物
          </Link>
          <Link href={`/user/settings/dislike`} className={styles["link-font"]}>
            嫌いな食べ物
          </Link>
          {/* <div className={styles.link}>
            <Link href={`/user/order-history`}>過去の注文履歴</Link>
          </div> */}
          {/* <div className={styles.link}>
            <Link href={`/user/qr`}>QRコード表示</Link>
          </div> */}
        </div>
      </header>
      <div className={styles.base}>
        <div onClick={handleQRClick}>
          <QRCodeComponent text={uid} size={300} />
        </div>
        <div className={styles.title}>ログイン用QRコード</div>
        {modalIsOpen && (
          <div className={styles["outside-modal"]} onClick={handleCloseModal}>
            <div className={styles["confirm-modal"]} onClick={handleModalInsideClick}>
              <div className={styles["QR-code"]}>
                <QRCodeComponent text={uid} size={330} />
              </div>
              <button className={styles["modal-button"]} onClick={handleCloseModal}>
                閉じる
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
