import Link from "next/link";
import styles from "./index.module.css";

export const EHeader = () => {
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
            <Link href="/employee/menu/settings">メニュー設定</Link>
          </div>
        </div>
        <div className={styles["header-right"]}>
          <div className={styles["header-item"]}>
            <p>ログアウト</p>
          </div>
        </div>
      </div>
    </>
  );
};
