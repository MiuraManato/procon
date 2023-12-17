// /api/table/getTables.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const tables = await prisma.storeTable.findMany({
      select: {
        tableId: true,
        storeId: true,
        tableName: true,
      },
    });

    res.status(200).json(tables);
  } catch (error) {
    console.error('Error fetching tables:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect(); // リクエストの終了時にPrismaを切断する
  }
}
