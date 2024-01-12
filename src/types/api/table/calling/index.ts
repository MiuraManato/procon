import { NextApiRequest } from "next";

export interface UpdateCallingRequest extends NextApiRequest {
  query: {
    stid: string;
  };
  body: {
    callingStatus: boolean;
  };
}
