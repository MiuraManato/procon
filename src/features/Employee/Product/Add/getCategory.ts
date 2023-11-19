import { prisma } from "@/utils/Prisma/PrismaClient";

export const getCategory = () => {
  const categories = prisma.category.findMany({
    select: {
      categoryId: true,
      categoryName: true,
    },
  });
  return categories;
};
