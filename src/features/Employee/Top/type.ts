type StoreTableStatus = {
  storeTableStatusId: number;
  tableId: number;
  status: string;
  numberOfPeople: number;
  calling: boolean;
};

type StoreTable = {
  tableId: number;
  storeId: number;
  tableName: string;
  storeTableStatus: StoreTableStatus[];
};

type Tables = StoreTable[];

export type { Tables };
