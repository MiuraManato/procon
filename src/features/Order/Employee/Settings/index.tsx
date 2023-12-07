import styles from "./index.module.css";
import router from "next/router";
import useAuth from "@/features/hooks/useAuth";

const toSeatSettings = () => {
  router.push("/order/employee/settings/table").catch((err) => console.error(err));
};

const toOrderEmployeeLogin = () => {
  router.push("/order/employee/login").catch((err) => console.error(err));
};

const toOrderTop = () => {
  router.push("/order").catch((err) => console.error(err));
};

export const OrderEmployeeSettings = () => {
  const user = useAuth();
  if (user === null) {
    toOrderEmployeeLogin();
  }
  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>設定画面</h1>
        </div>
        <div className={styles["items"]}>
          <div className={styles["item"]}>
            <button className={styles["item-button"]} onClick={toOrderTop}>
              <span>人数登録画面</span>
            </button>
          </div>
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
