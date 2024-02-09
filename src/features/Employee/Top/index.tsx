import { Tables } from "./type";
import styles from "./index.module.css";
import { useState } from "react";

export const EmployeeTop = ({ tables }: { tables: Tables }) => {
  const [tablesState, setTablesState] = useState<Tables>(tables);

  const handleButtonClick = async (tableId: number) => {
    try {
      await handleUpdateCalling(tableId);
      // 呼び出し状態を更新したテーブルの状態を更新
      setTablesState((prevTables) =>
        prevTables.map((table) => {
          if (table.tableId === tableId) {
            // 新しいオブジェクトを作成して、特定のテーブルのstoreTableStatusを更新
            const updatedStatuses = table.storeTableStatus.map((status) => {
              return { ...status, calling: false };
            });
            return { ...table, storeTableStatus: updatedStatuses };
          }
          return table;
        }),
      );
    } catch (error) {
      alert("呼び出しの更新に失敗しました");
    }
  };

  const handleUpdateCalling = async (storeTableId: number) => {
    const res = await fetch(`/api/table/UpdateCalling/${storeTableId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ callingStatus: false }),
    });
    if (!res.ok) {
      throw new Error("UpdateCalling failed");
    }
  };

  return (
    <>
      <div className={styles["container"]}>
        <div className={styles["table-list-container"]}>
          <h2>すべてのテーブル一覧</h2>
          <table className={styles["table"]}>
            <thead>
              <tr>
                <th>店舗名</th>
                <th>テーブルID</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {tablesState.map((table) => {
                const key = table.tableId;
                return (
                  <tr key={key}>
                    <td>{table.store.storeName}</td>
                    <td>{table.tableName}</td>
                    <td>
                      <button
                        type="button"
                        className={styles["tableCallingButton"]}
                        // eslint-disable-next-line @typescript-eslint/no-misused-promises
                        onClick={() => handleButtonClick(table.tableId)}
                        disabled={!table.storeTableStatus.some((status) => status.calling)}
                      >
                        呼び出し停止
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
