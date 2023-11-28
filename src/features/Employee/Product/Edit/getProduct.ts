import { prisma } from "@/utils/Prisma/PrismaClient";

export const getProduct = async (id: number) => {
  const product = await prisma.product.findUnique({
    select: {
      productId: true,
      productName: true,
      price: true,
      categoryId: true,
      description: true,
    },
    where: {
      productId: id,
    },
  });
  return product;
};
