import { prisma } from "@/utils/Prisma/PrismaClient";
import { NextApiRequestExtendsTableId } from "@/types/api/table/pay";
import { NextApiResponse } from "next";

const getTableName = async (req: NextApiRequestExtendsTableId, res: NextApiResponse) => {
  const { tableId } = req.query;

  if (!tableId || typeof tableId !== "string") {
    return res.status(400).json({ message: "Invalid request. tableId is missing" });
  }
  try {
    const parsedTableId = parseInt(tableId);

    const table = await prisma.storeTable.findFirst({
      where: { tableId: parsedTableId },
    });

    res.status(200).json({ table });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default getTableName;
