// features/Employee/Table/Edit/deleteTables.ts

import axios from 'axios';

export const deleteTable = async (tableId: number): Promise<void> => {
  try {
    // サーバーサイドのエンドポイントにDELETEリクエストを送信
    await axios.delete('/api/table/deleteTables', { data: { tableId } });
  } catch (error) {
    console.error('Error deleting table:', error);
    throw error;
  }
};
