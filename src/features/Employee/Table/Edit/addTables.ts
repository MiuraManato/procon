// features/Employee/Table/Edit/addTables.ts

import axios, { AxiosResponse } from 'axios';

type StoreTable = {
  // StoreTableの型定義に従ってプロパティを記述してください
  tableId: number;
  storeId: number;
  tableName: string;
  // 他のプロパティも追加
};

export const addTable = async (tableName: string, storeId: number): Promise<StoreTable> => {
  try {
    const response: AxiosResponse<StoreTable> = await axios.post('/api/table/addTables', { tableName, storeId });
    const newTable = response.data;

    return newTable;
  } catch (error) {
    console.error('Error adding table:', error);
    throw error;
  }
};
