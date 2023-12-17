// pages/api/table/deleteTables.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/utils/Prisma/PrismaClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { tableId } = req.body as { tableId: number };

    // Prismaを使ってデータベースから削除
    await prisma.storeTable.delete({
      where: {
        tableId,
      },
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error deleting table:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
