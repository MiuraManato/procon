import { Tables } from "./type";
import styles from "./index.module.css";

export const EmployeeTop = ({ tables }: { tables: Tables }) => {
  console.log(tables);
  return (
    <>
      <div className={styles["container"]}>
        <div className={styles["table-list-container"]}></div>
        <div className={styles["table-calling-container"]}></div>
      </div>
    </>
  );
};
