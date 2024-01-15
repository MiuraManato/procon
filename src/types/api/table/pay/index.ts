import { NextApiRequest } from "next";

export interface NextApiRequestExtendsTableId extends NextApiRequest {
  body: {
    tableId: string;
  };
}
