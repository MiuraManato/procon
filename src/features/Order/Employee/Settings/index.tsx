import styles from "./index.module.css";
import router from "next/router";

const toSeatSettings = () => {
  router.push("/order/employee/settings/seat").catch((err) => console.error(err));
};

export const OrderEmployeeSettings = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>設定画面</h1>
        </div>
        <div className={styles["items"]}>
          <div className={styles["item"]}>
            <button className={styles["item-button"]} onClick={toSeatSettings}>
              <span>席設定</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
