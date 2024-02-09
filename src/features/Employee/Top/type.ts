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
  store: {
    storeName: string;
  };
};

type Tables = StoreTable[];

type payloadNew = {
  calling: boolean;
  numberOfPeople: number;
  status: "EMPTY" | "USING";
  storeTableStatusId: number;
  tableId: number;
};

type payloadType = {
  schema: string;
  comnmit_timestamp: string;
  errors?: string;
  eventType: "INSERT" | "UPDATE" | "DELETE";
  new: payloadNew;
  table: string;
};

export type { Tables, payloadType };
