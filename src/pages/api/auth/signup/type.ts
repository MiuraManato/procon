import { NextApiRequest } from "next";

export interface NextApiRequestExtendsUser extends NextApiRequest {
  body: {
    uid: string;
    username: string;
    firstName: string;
    lastName: string;
    age: number;
    email: string;
  };
}
