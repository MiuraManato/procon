import { NextApiRequest } from "next";

export interface NextApiRequestWithStartTable extends NextApiRequest {
  body: {
    tableId: string;
    numberOfPeople: {
      adult: number;
      child: number;
    };
  };
}
