import { NextApiRequest } from "next";

export interface NextApiRequestEditUser extends NextApiRequest {
  body: {
    userId: string;
    username: string;
    firstName: string;
    lastName: string;
    age: number;
    email: string;
  };
}
