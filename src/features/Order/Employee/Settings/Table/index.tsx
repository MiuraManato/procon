import { storeTables } from "./type";
import styles from "./index.module.css";
import { useState } from "react";

export const TableSettings = ({ tables }: { tables: storeTables[] }) => {
  // 選択された店舗のIDをstateとして持つ
  const [selectedStore, setSelectedStore] = useState<number>(1);
  // 選択されているテーブルのIDをstateとして持つ
  const [selectedTable, setSelectedTable] = useState<number | null>(null);

  // 選択された店舗のIDをselectedStoreにセットする関数
  const handleStoreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStore(parseInt(event.target.value));
    // 店舗が変わったらテーブル選択もリセット
    setSelectedTable(null);
  };

  // 選択されたテーブルのIDをselectedTableにセットする関数
  const handleTableSelect = (tableId: number) => {
    setSelectedTable(tableId);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <select className={styles.select} onChange={handleStoreChange}>
            {tables.map((table) => (
              <option key={table.storeId} value={table.storeId}>
                {table.storeName}
              </option>
            ))}
          </select>
          <div className={styles.tableContainer}>
            <div className={styles.table}>
              <div className={styles.tableHeader}></div>
              <div className={styles.tableBody}>
                {tables
                  .find((table) => table.storeId === selectedStore)
                  ?.tables.map((table) => (
                    <div
                      className={`${styles.tableRow} ${selectedTable === table.tableId ? styles.selectedTableRow : ""}`}
                      key={table.tableId}
                      onClick={() => handleTableSelect(table.tableId)}
                    >
                      <div className={styles.tableCell}>{table.tableName}</div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
