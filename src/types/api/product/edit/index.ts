import { NextApiRequest } from "next";

export interface NextApiRequestWithEditProduct extends NextApiRequest {
  body: {
    productName: string;
    price: number;
    description: string;
    category: number;
    addedIngredients: number[];
    removedIngredients: number[];
    addedAllergies: number[];
    removedAllergies: number[];
    imageUrl: string;
  };
}
