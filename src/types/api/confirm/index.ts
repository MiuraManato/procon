import { NextApiRequest } from "next";

export interface NextApiRequestExtendsUser extends NextApiRequest {
  body: {
    uid: string;
  };
}
