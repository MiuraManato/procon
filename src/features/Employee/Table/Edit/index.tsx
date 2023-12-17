// features/Employee/Table/Edit/index.tsx

import React, { useState } from "react";
import { TableData, GetTableDataFunction, AddTableFunction, DeleteTableFunction } from "./type";

interface EditTableProps {
  tableData: TableData;
  getTableData: GetTableDataFunction;
  addTable: AddTableFunction;
  deleteTable: DeleteTableFunction;
  newTableName: string;
  setNewTableName: React.Dispatch<React.SetStateAction<string>>;
  newStoreId: string;
  setNewStoreId: React.Dispatch<React.SetStateAction<string>>;

  isAddTableModalOpen: boolean;
  setAddTableModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isDeleteTableModalOpen: boolean;
  setDeleteTableModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditTable: React.FC<EditTableProps> = ({
  tableData,
  getTableData,
  addTable,
  deleteTable,
}) => {
  const [selectedTableIds, setSelectedTableIds] = useState<number[]>([]);
  const [isDeleteTableModalOpen, setDeleteTableModalOpen] = useState(false);
  const [newTableName, setNewTableName] = useState<string>(""); // 型指定の追加
  const [newStoreId, setNewStoreId] = useState<string>(""); // 型指定の追加
  const [isAddTableModalOpen, setAddTableModalOpen] = useState(false);

  const handleAddTable = async () => {
    setAddTableModalOpen(true);
  };

  const handleDeleteTable = async () => {
    setDeleteTableModalOpen(true);
  };

  const closeModal = () => {
    setAddTableModalOpen(false);
    setDeleteTableModalOpen(false);
  };

  const handleAddTableSubmit = async () => {
    if (!newTableName.trim() || !newStoreId.trim()) {
      alert("未入力箇所があります");
      return;
    }

    await addTable(newTableName, parseInt(newStoreId, 10));
    await getTableData();
    closeModal();
  };

  const handleDeleteTableConfirm = async () => {
    if (window.confirm("本当に削除しますか？")) {
      if (selectedTableIds.length === 0) {
        // 選択されたテーブルがない場合の処理
        return;
      }
      // テーブル削除の処理
      for (const tableId of selectedTableIds) {
        await deleteTable(tableId);  // deleteTable 関数を正しく呼び出す
      }
      // テーブルデータを再取得して更新
      await getTableData();
      // モーダルを閉じる
      closeModal();
      // 選択状態をリセット
      setSelectedTableIds([]);
    }
  };

  const toggleSelectTable = (tableId: number) => {
    setSelectedTableIds((prevSelectedTableIds) => {
      if (prevSelectedTableIds.includes(tableId)) {
        return prevSelectedTableIds.filter((id) => id !== tableId);
      } else {
        return [...prevSelectedTableIds, tableId];
      }
    });
  };

  return (
    <div>
      <button onClick={handleAddTable}>新しいテーブル追加</button>
      <button onClick={handleDeleteTable}>テーブル削除</button>

      <div className={`modal-overlay ${isAddTableModalOpen ? "open" : ""}`}>
        <div className="modal">
          <button onClick={closeModal}>閉じる</button>
          <p>新しいテーブルを追加</p>
          <input
            type="text"
            placeholder="テーブル名"
            value={newTableName}
            onChange={(e) => setNewTableName(e.target.value)}
          />
          <input
            type="text"
            placeholder="店舗ID"
            value={newStoreId}
            onChange={(e) => setNewStoreId(e.target.value)}
          />
          <button onClick={handleAddTableSubmit}>追加</button>
        </div>
      </div>

      <div className={`modal-overlay ${isDeleteTableModalOpen ? "open" : ""}`}>
        <div className="modal">
          <button onClick={closeModal}>閉じる</button>
          <p>選択したテーブルを削除</p>
          <ul>
            {tableData.map((table) => (
              <li key={table.tableId}>
                <input
                  type="checkbox"
                  checked={selectedTableIds.includes(table.tableId)}
                  onChange={() => toggleSelectTable(table.tableId)}
                />
                {table.tableName} - 店舗ID: {table.storeId}
              </li>
            ))}
          </ul>
          <button onClick={handleDeleteTableConfirm}>削除</button>
        </div>
      </div>
    </div>
  );
};
