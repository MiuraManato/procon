import { NextApiResponse } from "next";
import { NextApiRequestWithOrderStatus } from "@/types/api/order/detail";
import { prisma } from "@/utils/Prisma/PrismaClient";
import { ORDERSTATUS } from "@prisma/client";

const updateOrderStatuses = async (req: NextApiRequestWithOrderStatus, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  console.log(req.body);
  const { updates } = req.body;

  try {
    await prisma.$transaction(
      updates.map((update) =>
        prisma.orderDetail.update({
          where: { orderDetailId: update.orderDetailId },
          data: { orderStatus: update.orderStatus as ORDERSTATUS },
        }),
      ),
    );

    return res.status(200).json({ message: "Order statuses updated successfully" });
  } catch (error) {
    console.error("Failed to update order statuses:", error);
    return res.status(500).json({ message: "Failed to update order statuses" });
  } finally {
    await prisma.$disconnect();
  }
};

export default updateOrderStatuses;
