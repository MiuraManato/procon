export interface tables {
  storeId: number;
  storeName: string;
  tables: {
    tableId: number;
    tableName: string;
  }[];
}
