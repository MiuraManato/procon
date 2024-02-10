import { Tables, payloadType } from "./type";
import styles from "./index.module.css";
import { useEffect, useState } from "react";
import router from "next/dist/client/router";
import Head from "next/head";
import { supabase } from "@/utils/Supabase/supabaseClient";

export const EmployeeTop = ({ tables }: { tables: Tables }) => {
  const [tablesState, setTablesState] = useState<Tables>(tables);
  const [selectedStore, setSelectedStore] = useState("");
  const [filteredTables, setFilteredTables] = useState<Tables>(tablesState);

  const handleButtonClick = async (e: React.MouseEvent, tableId: number) => {
    e.stopPropagation();
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

  const handleRowClick = (tableId: number) => {
    // 指定されたURLにナビゲート
    void router.push(`/employee/table/detail/${tableId}`);
  };

  const handleStoreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStore(e.target.value);
  };

  useEffect(() => {
    const filtered = selectedStore
      ? tablesState.filter((table) => table.store.storeName === selectedStore)
      : tablesState;
    setFilteredTables(filtered);
  }, [selectedStore, tablesState]);

  const onReceive = (payload: unknown) => {
    const pl = payload as payloadType;
    if (pl.new.calling) {
      setTablesState((prevTables) =>
        prevTables.map((table) => {
          if (table.tableId === pl.new.tableId) {
            const updatedStatuses = table.storeTableStatus.map((status) => {
              return { ...status, calling: true };
            });
            return { ...table, storeTableStatus: updatedStatuses };
          }
          return table;
        }),
      );
    }
  };

  supabase
    .channel("procon-test")
    .on("postgres_changes", { event: "UPDATE", schema: "public", table: "StoreTableStatus" }, onReceive)
    .subscribe();

  return (
    <>
      <Head>
        <title>従業員トップ | PersonalizedMenu</title>
      </Head>
      <div className={styles["container"]}>
        <div className={styles["table-list-container"]}>
          <div className={styles["table-list-header"]}>
            <h2>すべてのテーブル一覧</h2>
            <select onChange={handleStoreChange} value={selectedStore} className={styles.filterSelect}>
              <option value="">すべての店舗</option>
              {Array.from(new Set(tablesState.map((table) => table.store.storeName)))
                .sort()
                .map((storeName) => (
                  <option key={storeName} value={storeName}>
                    {storeName}
                  </option>
                ))}
            </select>
          </div>

          <table className={styles["table"]}>
            <thead>
              <tr>
                <th>店舗名</th>
                <th>テーブルID</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredTables.map((table) => {
                const key = table.tableId;
                return (
                  <tr key={key} onClick={() => handleRowClick(table.tableId)}>
                    <td>{table.store.storeName}</td>
                    <td>{table.tableName}</td>
                    <td>
                      <button
                        type="button"
                        className={styles["tableCallingButton"]}
                        // eslint-disable-next-line @typescript-eslint/no-misused-promises
                        onClick={(e) => handleButtonClick(e, table.tableId)}
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
