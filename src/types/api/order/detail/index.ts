import { NextApiRequest } from "next";

export interface NextApiRequestWithOrderStatus extends NextApiRequest {
  body: {
    updates: {
      orderDetailId: number;
      orderStatus: string;
    }[];
  };
}
