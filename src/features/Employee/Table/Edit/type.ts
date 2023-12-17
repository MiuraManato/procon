// type.ts

type StoreTable = {
  tableId: number;
  storeId: number;
  tableName: string;
};

type TableData = StoreTable[];
type GetTableDataFunction = () => Promise<TableData>;
type AddTableFunction = (tableName: string, storeId: number) => Promise<StoreTable>;
type DeleteTableFunction = (tableId: number) => Promise<void>;


interface EditTableProps {
  tableData: TableData;
  getTableData: GetTableDataFunction;
  addTable: AddTableFunction;
  deleteTable: DeleteTableFunction;
  newTableName: string;  // 追加
  newStoreId: string;    // 追加
}

export type { EditTableProps, StoreTable, TableData, GetTableDataFunction, AddTableFunction, DeleteTableFunction };