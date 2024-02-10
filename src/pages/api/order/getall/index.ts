import { prisma } from "@/utils/Prisma/PrismaClient";
import { NextApiRequest, NextApiResponse } from "next";

const getOrders = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const orders = await prisma.order.findMany({
      select: {
        orderId: true,
        orderedAt: true,
        tableId: true,
        storeTable: {
          select: {
            tableName: true,
          },
        },
        orderDetail: {
          select: {
            orderDetailId: true,
            orderId: true,
            productId: true,
            quantity: true,
            orderStatus: true,
            product: {
              select: {
                productId: true,
                productName: true,
                price: true,
                description: true,
              },
            },
          },
        },
      },
      orderBy: {
        orderedAt: "asc",
      },
    });

    const serializedOrders = orders.map((order) => ({
      ...order,
      orderedAt: order.orderedAt.toISOString(),
      orderDetail: order.orderDetail.map((detail) => ({
        ...detail,
      })),
    }));

    res.status(200).json(serializedOrders);
  } catch (error) {
    console.error("Failed to get orders:", error);
    res.status(500).json({ message: "Failed to get orders" });
  } finally {
    await prisma.$disconnect();
  }
};

export default getOrders;
