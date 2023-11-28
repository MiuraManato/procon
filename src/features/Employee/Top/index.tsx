import { Tables } from "./type";
import styles from "./index.module.css";
import { useEffect, useState } from "react";
import { StoreTable } from "@prisma/client";
import Link from "next/link";

export const EmployeeTop = ({ tables }: { tables: Tables }) => {
  const [callingTables, setCallingTables] = useState<StoreTable[]>([]);

  useEffect(() => {
    // 呼び出し中のテーブルをフィルタリングしてステートにセットする。storeTableStatusが配列になっていることを前提とする。
    const filteredTables = tables.filter((table) => table.storeTableStatus.some((status) => status.calling));
    setCallingTables(filteredTables);
  }, [tables]);

  const handleButtonClick = (tableId: number) => {
    const updateCalling = async () => {
      try {
        await handleUpdateCalling(tableId);
        setCallingTables((prev) => prev.filter((table: StoreTable) => table.tableId !== tableId));
      } catch (error) {
        alert("呼び出しの更新に失敗しました");
      }
    };

    updateCalling().catch((error) => {
      alert(error);
    });
  };

  const handleUpdateCalling = async (storeTableId: number) => {
    const res = await fetch(`/api/table/UpdateCalling/${storeTableId}`, {
      method: "PUT",
    });
    if (!res.ok) {
      throw new Error("UpdateCalling failed");
    }
  };

  return (
    <>
      <div className={styles["container"]}>
        <div className={styles["table-list-container"]}>
          {tables.map((table) => {
            const key = table.storeTableStatus[0]?.storeTableStatusId || table.tableId;
            return (
              <Link href={`/employee/table/detail/${table.tableId}`} key={key}>
                <div className={styles["table-item"]} key={key}>
                  <div className={styles["table-name"]}>{table.tableName}</div>
                </div>
              </Link>
            );
          })}
        </div>
        <div className={styles["table-calling-container"]}>
          <div className={styles["table-calling-title"]}>呼び出し中</div>
          {callingTables.map((table) => {
            const key = `${table.tableId}-${table.storeId}`;
            return (
              <div className={styles["table-calling-item"]} key={key}>
                <div className={styles["table-name"]}>{table.tableName}</div>
                <button
                  type="button"
                  className={styles["table-calling-button"]}
                  onClick={() => handleButtonClick(table.tableId)}
                >
                  OK
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
