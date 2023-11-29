type ProductType = {
  productId: number;
  productName: string;
  price: number;
  categoryId: number;
  description: string;
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

export type { ProductType };
