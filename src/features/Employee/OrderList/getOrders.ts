import { prisma } from "@/utils/Prisma/PrismaClient";

export const getOrders = async () => {
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
  });

  const serializedOrders = orders.map((order) => ({
    ...order,
    orderedAt: order.orderedAt.toISOString(),
    orderDetail: order.orderDetail.map((detail) => ({
      ...detail,
    })),
  }));

  return serializedOrders;
};
