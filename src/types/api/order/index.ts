import { NextApiRequest } from "next";

export interface OrderNextApiRequest extends NextApiRequest {
  body: {
    table: number;
    cart: {
      menuProductId: number;
      productId: number;
      count: number;
    }[];
    users: string[];
  };
}
