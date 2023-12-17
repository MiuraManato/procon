// features/Employee/Table/Edit/getTables.ts

import axios, { AxiosResponse } from 'axios';

type TableDataResponse = {
  tableId: number;
  storeId: number;
  tableName: string;
};

export const getTableData = async (): Promise<TableDataResponse[]> => {
  try {
    const response: AxiosResponse<TableDataResponse[]> = await axios.get('/api/table/getTables');
    return response.data;
  } catch (error) {
    console.error('Error getting table data:', error);
    throw error;
  }
};
