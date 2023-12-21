import { Allergy, Ingredient } from "@prisma/client";

// ProductAllergy関連の型定義
type ProductAllergy = {
  allergyId: number;
  allergy: Allergy;
};

type ProductIngredient = {
  ingredientId: number;
  ingredient: Ingredient;
};

// Product関連の型定義
type Product = {
  productId: number;
  productName: string;
  price: number;
  categoryId: number;
  description: string;
  imageUrl: string;
  isSoldOut: boolean;
  isDeleted: boolean;
  productAllergies: ProductAllergy[];
  productIngredients: ProductIngredient[];
};

// MenuProduct関連の型定義
type MenuProduct = {
  menuProductId: number;
  menuId: number;
  productId: number;
  pages: number;
  displayOrder: number;
  product: Product;
};

// MenuCategory関連の型定義
type MenuCategory = {
  menuId: number;
  menuCategoryName: string;
  displayOrder: number;
  menuProducts: MenuProduct[];
};

// getMenuData関数の戻り値の型定義
type MenuData = MenuCategory[];

// getMenuData関数自体の型定義（非同期関数なのでPromiseを使用）
type GetMenuDataFunction = () => Promise<MenuData>;

export type { MenuData, GetMenuDataFunction };
