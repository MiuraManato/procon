import { prisma } from "@/utils/Prisma/PrismaClient";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getDataHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const data = await prisma.$transaction([
        prisma.user.findMany(),
        prisma.userPreference.findMany(),
        prisma.order.findMany(),
        prisma.orderDetail.findMany(),
        prisma.orderHistoryLog.findMany(),
        prisma.orderUser.findMany(),
        prisma.product.findMany(),
        prisma.orderDetailLog.findMany(),
        prisma.productAllergy.findMany(),
        prisma.menuProduct.findMany(),
        prisma.productIngredient.findMany(),
        prisma.allergy.findMany(),
        prisma.ingredient.findMany(),
        prisma.category.findMany(),
        prisma.menu.findMany(),
        prisma.store.findMany(),
        prisma.storeTable.findMany(),
        prisma.storeTableStatus.findMany(),
        prisma.userAllergy.findMany(),
      ]);

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: "Error fetching data" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
