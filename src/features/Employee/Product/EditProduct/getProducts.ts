import { prisma } from "@/utils/Prisma/PrismaClient";

export const getProduct = async () => {
  const product = await prisma.product.findMany({
    select: {
      productId: true,
      productName: true,
      price: true,
      categoryId: true,
      description: true,
      imageUrl: true,
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
    orderBy: {
      productId: "asc",
    },
  });
  return product;
};
