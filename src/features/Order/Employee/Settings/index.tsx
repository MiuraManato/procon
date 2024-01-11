import { useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./index.module.css";
import Link from "next/link";
import useAuth from "@/features/hooks/useAuth";

export const OrderEmployeeSettings = () => {
  const user = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      void router.push("/order/employee/login");
    }
  }, [user, router]);

  if (user === null) {
    return null;
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>設定画面</h1>
        </div>
        <div className={styles["items"]}>
          <div className={styles["item"]}>
            <Link href="/order">
              <span>人数登録画面</span>
            </Link>
          </div>
        </div>
        <div className={styles["items"]}>
          <div className={styles["item"]}>
            <Link href="/order/employee/settings/table">
              <span>席設定</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
