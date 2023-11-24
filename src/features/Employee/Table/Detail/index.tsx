import { Table } from "./type";
import styles from "./index.module.css";
import { useEffect, useState } from "react";

export const TableDetail = ({ table }: { table: Table }) => {
  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  useEffect(() => {
    if (table.storeTableStatus[0].status === "EMPTY") {
      setIsEmpty(true);
    }
  }, [table]);

  return (
    <>
      <div className={styles["container"]}>
        <div className={styles["table-name"]}>{table.tableName}</div>
        {isEmpty ? (
          <div className={styles["table-status-empty"]}>空席</div>
        ) : (
          <>
            <div className={styles["table-status-occupied"]}>使用中</div>
            <div className={styles["table-amount"]}>人数：{table.storeTableStatus[0].numberOfPeople}</div>
          </>
        )}
      </div>
    </>
  );
};
