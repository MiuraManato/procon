import { storeTables } from "./type";
import styles from "./index.module.css";
import { useState } from "react";

export const TableSettings = ({ tables }: { tables: storeTables[] }) => {
  // 選択された店舗のIDをstateとして持つ
  const [selectedStore, setSelectedStore] = useState<number>(1);

  // 選択された店舗のIDをselectedStoreにセットする関数
  const handleStoreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStore(parseInt(event.target.value));
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
                    <div className={styles.tableRow} key={table.tableId}>
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
