import { prisma } from "@/utils/Prisma/PrismaClient";
import { NextApiRequestWithStartTable } from "@/types/api/table/start";
import { NextApiResponse } from "next";

const startTableHandler = async (req: NextApiRequestWithStartTable, res: NextApiResponse) => {
  const { tableId, numberOfPeople } = req.body;

  if (!tableId || !numberOfPeople) {
    return res.status(400).json({ message: "Invalid request" });
  }

  try {
    const parsedTableId = parseInt(tableId);

    const storeTableStatus = await prisma.storeTableStatus.findFirst({
      where: {
        tableId: parsedTableId,
      },
      select: {
        storeTableStatusId: true,
      },
    });

    if (!storeTableStatus) {
      return res.status(404).json({ message: "Table not found" });
    }

    const table = await prisma.storeTableStatus.update({
      where: {
        storeTableStatusId: storeTableStatus.storeTableStatusId,
      },
      data: {
        numberOfPeople: numberOfPeople.adult + numberOfPeople.child,
        status: "USING",
      },
    });

    res.status(200).json({ message: "Table started successfully", table });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  } finally {
    await prisma.$disconnect();
  }
};

export default startTableHandler;
