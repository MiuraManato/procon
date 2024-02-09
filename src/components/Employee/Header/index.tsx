import Link from "next/link";
import styles from "./index.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { firebaseApp } from "@/utils/Firebase/firebaseConfig";
import { getAuth } from "firebase/auth";

export const EmployeeHeader = () => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const router = useRouter();
  const auth = getAuth(firebaseApp);

  const checkLogout = () => {
    setIsLogoutModalOpen(true);
  };

  const doLogout = async () => {
    try {
      await auth.signOut();
      await router.push("/employee/login");
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

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        router.push("/employee/login").catch((error) => {
          console.error("Redirect failed:", error);
        });
      }
    });

    return () => unsubscribe();
  }, [auth, router]);

  return (
    <>
      <div className={styles["header-container"]}>
        <div className={styles["header-left"]}>
          <div className={styles["header-item"]}>
            <Link href="/employee/top">トップ</Link>
          </div>
          <div className={styles["header-item"]}>
            <Link href="/employee/order-list">オーダー一覧</Link>
          </div>
          <div className={styles["header-item"]}>
            <Link href="/employee/table/edit">席編集</Link>
          </div>
          <div className={styles["header-item"]}>
            <Link href="/employee/product/add">メニュー追加</Link>
          </div>
        </div>
        <div className={styles["header-right"]}>
          <div className={styles["header-item"]}>
            <button
              type="button"
              className={styles["logout-button"]}
              onClick={() => {
                checkLogout();
              }}
            >
              ログアウト
            </button>
          </div>
        </div>
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
