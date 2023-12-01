import { NextApiRequest } from "next";

export interface NextApiRequestWithEmail extends NextApiRequest {
  body: {
    email: string;
  };
}
