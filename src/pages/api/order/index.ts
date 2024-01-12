import { NextApiResponse } from "next";
import { OrderNextApiRequest } from "@/types/api/order";
import { prisma } from "@/utils/Prisma/PrismaClient";

const updateOrder = async (req: OrderNextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { table, cart, users } = req.body;

  try {
    await prisma.$transaction(async (prisma) => {
      const order = await prisma.order.create({
        data: {
          tableId: table,
        },
      });

      const transactions = [
        ...cart.map((item) =>
          prisma.orderDetail.create({
            data: {
              orderId: order.orderId,
              productId: item.id,
              quantity: item.count,
            },
          }),
        ),
        ...users.map((user) =>
          prisma.orderUser.create({
            data: {
              orderId: order.orderId,
              userId: user.userId,
            },
          }),
        ),
      ];

      await Promise.all(transactions);
    });

    return res.status(200).json({ message: "Order updated successfully" });
  } catch (error) {
    console.error("Failed to update order:", error);
    return res.status(500).json({ message: "Failed to update order" });
  }
};

export default updateOrder;