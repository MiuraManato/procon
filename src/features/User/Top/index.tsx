import Head from "next/head";
import styles from "./index.module.css";
import QRCodeComponent from "@/components/User/QRCode";
import useAuth from "@/features/hooks/useAuth";
import { useEffect, useState } from "react";
import Router from "next/router";

export const Top = () => {
  const [uid, setUid] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  // QRコードモーダルの表示を管理するstate
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const user = useAuth();

  useEffect(() => {
    if (user === undefined) return;
    if (user === null) {
      Router.push("/user/auth/login").catch(console.error);
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

  if (loading) return <div className={styles.loading}>Loading...</div>;
  return (
    <>
      <Head>
        <title>トップ | PersonalizedMenu</title>
      </Head>
      <div className={styles.base}>
        <div className={styles.title}>ログイン用QRコード</div>
        <div onClick={handleQRClick}>
          <QRCodeComponent text={uid} size={300} />
        </div>
        <div className={styles.label}>QRコードをタップで拡大</div>
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
