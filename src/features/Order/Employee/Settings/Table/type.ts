interface storeTables {
  storeId: number;
  storeName: string;
  tables: tables[];
}

interface tables {
  tableId: number;
  tableName: string;
}

export type { storeTables };
