import { prisma } from "@/utils/Prisma/PrismaClient";
import { NextApiRequest, NextApiResponse } from "next";

const getOrder = async (req: NextApiRequest, res: NextApiResponse) => {
  const { tableId } = req.query;

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  if (!tableId || typeof tableId !== "string") {
    return res.status(400).json({ message: "Missing tableId" });
  }

  const parsedTableId = parseInt(tableId);

  try {
    const orders = await prisma.order.findMany({
      where: { tableId: parsedTableId },
      include: {
        orderDetail: {
          include: {
            product: true,
          },
        },
      },
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Failed to get order:", error);
    res.status(500).json({ message: "Failed to get order" });
  } finally {
    await prisma.$disconnect();
  }
};

export default getOrder;
