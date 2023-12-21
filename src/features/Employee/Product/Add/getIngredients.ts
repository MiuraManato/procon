import { prisma } from "@/utils/Prisma/PrismaClient";

export const getIngredients = () => {
  const ingredients = prisma.ingredient.findMany({
    select: {
      ingredientId: true,
      ingredientName: true,
    },
  });
  return ingredients;
};
