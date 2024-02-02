import Head from "next/head";
import Link from "next/link";
import styles from "./index.module.css";
import useAuth from "@/features/hooks/useAuth";
import { useEffect, useState } from "react";
import { firebaseApp } from "@/utils/Firebase/firebaseConfig";
import { getAuth } from "firebase/auth";
import router from "next/router";

export const AccountInfo = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const user = useAuth();
  const auth = getAuth(firebaseApp);

  useEffect(() => {
    if (user === undefined) return;
    if (user === null) {
      window.location.href = "/user/auth/login";
      return;
    }
    setLoading(false);
  }, [user]);

  const doLogout = async () => {
    try {
      await auth.signOut();
      await router.push("/user/auth/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const closeModal = () => {
    setIsLogoutModalOpen(false);
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  if (loading) return <>Loading...</>;

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
        <button className={styles.btn} onClick={() => setIsLogoutModalOpen(true)}>
          ログアウト
        </button>
        <Link href={"/user/account/deactivate/confirm"} className={styles.link}>
          <div className={styles.tbtn}>退会</div>
        </Link>
      </div>
      {isLogoutModalOpen && (
        <div className={styles["logout-modal-background"]} onClick={closeModal}>
          <div className={styles["logout-modal"]} onClick={stopPropagation}>
            <div className={styles["logout-modal-container"]}>
              <div className={styles["logout-modal-title"]}>ログアウトしますか？</div>
              <div className={styles["logout-modal-button-container"]}>
                <button
                  type="button"
                  className={styles["logout-modal-button"]}
                  onClick={() => {
                    setIsLogoutModalOpen(false);
                  }}
                >
                  キャンセル
                </button>
                <button
                  type="button"
                  className={styles["logout-modal-logout-button"]}
                  onClick={() => {
                    void doLogout();
                  }}
                >
                  ログアウト
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
