// /pages/api/table/addTable.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/utils/Prisma/PrismaClient';

// 追加するデータの型を定義
interface AddTableData {
  tableName: string;
  storeId: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // メソッドが許可されていない場合はエラーを返す
  }

  // リクエストボディの型を指定
  const body = req.body as AddTableData;

  try {
    const newTable = await prisma.storeTable.create({
      data: {
        tableName: body.tableName,
        storeId: body.storeId,
      },
    });

    res.status(200).json(newTable);
  } catch (error) {
    console.error('Error adding table:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
