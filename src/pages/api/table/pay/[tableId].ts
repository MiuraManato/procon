import { prisma } from "@/utils/Prisma/PrismaClient";
import { NextApiRequestExtendsTableId } from "@/types/api/table/pay";
import { NextApiResponse } from "next";

const payTableHandler = async (req: NextApiRequestExtendsTableId, res: NextApiResponse) => {
  const { tableId } = req.query;

  if (!tableId || typeof tableId !== "string") {
    return res.status(400).json({ message: "Invalid request. tableId is missing" });
  }
  try {
    const parsedTableId = parseInt(tableId);

    // Order と OrderDetail のデータを取得
    const orders = await prisma.order.findMany({
      where: { tableId: parsedTableId },
      include: { orderDetail: true },
    });

    // トランザクションを開始
    await prisma.$transaction(async (prisma) => {
      for (const order of orders) {
        // OrderHistoryLog にデータを挿入
        const orderHistoryLog = await prisma.orderHistoryLog.create({
          data: {
            orderId: order.orderId,
            orderedAt: order.orderedAt,
            tableId: order.tableId,
          },
        });

        // OrderDetailLog にデータを挿入
        for (const detail of order.orderDetail) {
          await prisma.orderDetailLog.create({
            data: {
              orderHistoryLogId: orderHistoryLog.orderHistoryLogId,
              productId: detail.productId,
              quantity: detail.quantity,
              orderStatus: detail.orderStatus,
            },
          });
        }

        // OrderUser レコードを削除
        await prisma.orderUser.deleteMany({
          where: { orderId: order.orderId },
        });

        // OrderDetail レコードを削除
        await prisma.orderDetail.deleteMany({
          where: { orderId: order.orderId },
        });

        // Order レコードを削除
        await prisma.order.delete({
          where: { orderId: order.orderId },
        });

        // StoreTableStatus のレコードを取得し更新
        const storeTableStatus = await prisma.storeTableStatus.findFirst({
          where: { tableId: parsedTableId },
        });

        if (!storeTableStatus) {
          throw new Error(`StoreTableStatus not found for tableId: ${parsedTableId}`);
        }

        // StoreTableStatus レコードを更新
        await prisma.storeTableStatus.update({
          where: { storeTableStatusId: storeTableStatus.storeTableStatusId },
          data: { status: "EMPTY", numberOfPeople: 0, calling: false },
        });
      }
    });

    res.status(200).json({ message: "Data moved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  } finally {
    await prisma.$disconnect();
  }
};

export default payTableHandler;
