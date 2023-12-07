import { prisma } from "@/utils/Prisma/PrismaClient";

export const getTables = async () => {
  const tables = await prisma.store.findMany({
    select: {
      storeId: true,
      storeName: true,
      tables: {
        select: {
          tableId: true,
          tableName: true,
        },
      },
    },
  });
  return tables;
};
