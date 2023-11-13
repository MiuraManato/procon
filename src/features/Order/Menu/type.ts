type Product = {
  productId: number;
  productName: string;
  price: number;
  categoryId: number;
  description: string;
  isSoldOut: boolean;
  isDeleted: boolean;
};

type MenuProduct = {
  menuProductId: number;
  menuId: number;
  productId: number;
  pages: number;
  displayOrder: number;
  product: Product;
};

type Menu = {
  menuId: number;
  menuCategoryName: string;
  displayOrder: number;
  menuProducts: MenuProduct[];
};

type MenuData = Menu[];

type GetMenuDataFunction = () => Promise<MenuData>;

export type { GetMenuDataFunction, MenuData };
