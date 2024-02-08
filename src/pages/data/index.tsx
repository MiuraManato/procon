/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import styles from "./index.module.css";

const DatabasePage = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/data")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }, []);

  if (!data || data.length === 0) {
    return <div>データがありません。</div>;
  }

  return (
    <div>
      {data.map((dataset, index) => {
        // データセットが空の場合の処理
        if (dataset.length === 0) {
          return <div key={index}>データセット {index + 1} は空です。</div>;
        }

        // データセットからテーブルのヘッダーを生成
        const tableHeaders = Object.keys(dataset[0]);

        return (
          <div key={index}>
            <h2>データセット {index + 1}</h2>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  {tableHeaders.map((header) => (
                    <th key={header} className={styles.dataTableHeader}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dataset.map(
                  (
                    item: {
                      [x: string]:
                        | string
                        | number
                        | boolean
                        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                        | Iterable<React.ReactNode>
                        | React.ReactPortal
                        | React.PromiseLikeOfReactNode
                        | null
                        | undefined;
                    },
                    idx: React.Key | null | undefined,
                  ) => (
                    <tr key={idx} className={styles["dataTableRow"]}>
                      {tableHeaders.map((header) => (
                        <td key={header} className={styles["dataTableCell"]}>
                          {item[header]}
                        </td>
                      ))}
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
};

export default DatabasePage;
