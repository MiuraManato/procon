import { NextApiRequest } from "next";

export interface OrderNextApiRequest extends NextApiRequest {
  body: {
    table: number;
    cart: {
      id: number;
      count: number;
    }[];
    users: string[];
  };
}
