export interface storeTable {
  tableId: number;
  tableName: string;
  store: {
    storeId: number;
    storeName: string;
  };
}

export interface tables {
  storeId: number;
  storeName: string;
  tables: {
    tableId: number;
    tableName: string;
  }[];
}
