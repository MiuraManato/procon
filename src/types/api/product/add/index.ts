import { NextApiRequest } from "next";

export interface NextApiRequestWithAddProduct extends NextApiRequest {
  body: {
    productName: string;
    price: number;
    description: string;
    category: number;
    ingredients: number[];
    allergies: number[];
    imageUrl: string;
  };
}
