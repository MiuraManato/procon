import { prisma } from "@/utils/Prisma/PrismaClient";

export const getTables = async () => {
  const tables = await prisma.storeTable.findMany({
    select: {
      tableId: true,
      tableName: true,
      store: {
        select: {
          storeId: true,
          storeName: true,
        },
      }
    }
  });
  return tables;
};