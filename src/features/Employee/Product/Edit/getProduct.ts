import { prisma } from "@/utils/Prisma/PrismaClient";

export const getProduct = async (id: number) => {
  const product = await prisma.product.findUnique({
    select: {
      productId: true,
      productName: true,
      price: true,
      categoryId: true,
      description: true,
      productIngredients: {
        select: {
          ingredientId: true,
          ingredient: {
            select: {
              ingredientName: true,
            },
          },
        },
      },
      productAllergies: {
        select: {
          allergyId: true,
          allergy: {
            select: {
              allergyName: true,
            },
          },
        },
      },
    },
    where: {
      productId: id,
    },
  });
  return product;
};
