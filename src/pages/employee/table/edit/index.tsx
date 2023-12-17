// pages/employee/table/edit/index.tsx

import { EditTable } from "@/features/Employee/Table/Edit";
import { getTableData } from "@/features/Employee/Table/Edit/getTables";
import { addTable } from "@/features/Employee/Table/Edit/addTables";
import { deleteTable } from "@/features/Employee/Table/Edit/deleteTables";
import { TableData, GetTableDataFunction, AddTableFunction, DeleteTableFunction, StoreTable } from "@/features/Employee/Table/Edit/type";
import { useEffect, useState } from "react";

const EditTablePage = () => {
  const [tableData, setTableData] = useState<TableData>([]);
  const [newTableName, setNewTableName] = useState("");
  const [newStoreId, setNewStoreId] = useState("");
  const [isAddTableModalOpen, setAddTableModalOpen] = useState(false);
  const [isDeleteTableModalOpen, setDeleteTableModalOpen] = useState(false);

  const getTableDataFunction: GetTableDataFunction = async () => {
    const data = await getTableData();
    setTableData(data);
    return data;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const addTableFunction: AddTableFunction = async (tableName, storeId) => {
    if (!tableName.trim() || !storeId) {
      alert("未入力箇所があります");
      return Promise.resolve({} as StoreTable); // または return {} as StoreTable; でも良い
    }
  
    const newData = await addTable(tableName, storeId);
    const updatedData = await getTableDataFunction();
    setTableData(updatedData);
    setAddTableModalOpen(false);
    return newData;
  };


  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const deleteTableFunction: DeleteTableFunction = async (tableId) => { // 引数を追加
    await deleteTable(tableId);
    const newData = await getTableData();
    setTableData(newData);
  };

  useEffect(() => {
    getTableDataFunction();
  }, []);

  return (
    <EditTable
      tableData={tableData}
      getTableData={getTableData}
      addTable={addTable}
      deleteTable={deleteTable}
      newTableName={newTableName} // 追加
      newStoreId={newStoreId} // 追加
      setNewTableName={setNewTableName}
      setNewStoreId={setNewStoreId}
      isAddTableModalOpen={isAddTableModalOpen}
      setAddTableModalOpen={setAddTableModalOpen}
      isDeleteTableModalOpen={isDeleteTableModalOpen}
      setDeleteTableModalOpen={setDeleteTableModalOpen}
    />
  );
};

export default EditTablePage;
