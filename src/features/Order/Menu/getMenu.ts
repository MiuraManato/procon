import { PrismaClient } from "@prisma/client";

export const getMenuData = async () => {
  const prisma = new PrismaClient();
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
              isSoldOut: true,
              isDeleted: true,
            },
          },
        },
      },
    },
  });
  await prisma.$disconnect();
  return menu;
};
