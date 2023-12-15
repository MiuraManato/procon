import { prisma } from "@/utils/Prisma/PrismaClient";

export const getMenuData = async () => {
  const menu = await prisma.menu.findMany({
    select: {
      menuId: true,
      menuCategoryName: true,
      displayOrder: true,
      menuProducts: {
        select: {
          menuProductId: true,
          menuId: true,
          productId: true,
          pages: true,
          displayOrder: true,
          product: {
            select: {
              productId: true,
              productName: true,
              price: true,
              categoryId: true,
              description: true,
              imageUrl: true,
              isSoldOut: true,
              isDeleted: true,
              productAllergies: {
                select: {
                  productId: true,
                  allergyId: true,
                  allergy: {
                    select: {
                      allergyId: true,
                      allergyName: true,
                    },
                  },
                },
              },
              productIngredients: {
                select: {
                  productId: true,
                  ingredientId: true,
                  ingredient: {
                    select: {
                      ingredientId: true,
                      ingredientName: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });
  return menu;
};
