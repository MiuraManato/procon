import { prisma } from "@/utils/Prisma/PrismaClient";

export const getTables = async () => {
  const tables = await prisma.storeTable.findMany({
    select: {
      tableId: true,
      storeId: true,
      tableName: true,
      storeTableStatus: {
        select: {
          storeTableStatusId: true,
          tableId: true,
          status: true,
          numberOfPeople: true,
          calling: true,
        },
      },
    },
    where: {
      storeId: 1,
    },
    orderBy: {
      tableId: "asc",
    },
  });
  return tables;
};

export const getTableIds = async () => {
  const tableIds = await prisma.storeTable.findMany({
    select: {
      tableId: true,
    },
    where: {
      storeId: 1,
    },
    orderBy: {
      tableId: "asc",
    },
  });
  return tableIds;
};

export const getTable = async (tableId: number) => {
  const table = await prisma.storeTable.findUnique({
    select: {
      tableId: true,
      storeId: true,
      tableName: true,
      storeTableStatus: {
        select: {
          storeTableStatusId: true,
          tableId: true,
          status: true,
          numberOfPeople: true,
          calling: true,
        },
      },
    },
    where: {
      tableId,
    },
  });
  return table;
};
