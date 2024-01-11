import { NextApiRequest } from "next";

export interface NextApiRequestEditUser extends NextApiRequest {
  body: {
    id: string;
    firstName: string;
    lastName: string;
    age: number;
    email: string;
  };
}
