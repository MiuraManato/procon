type Product = {
  productId: number;
  productName: string;
  price: number;
  categoryId: number;
  description: string;
  imageUrl: string;
  isSoldOut: boolean;
  isDeleted: boolean;
  deletedAt: Date | null;
  productIngredients: {
    ingredientId: number;
    ingredient: {
      ingredientName: string;
    };
  }[];
  productAllergies: {
    allergyId: number;
    allergy: {
      allergyName: string;
    };
  }[];
};

export type { Product };
