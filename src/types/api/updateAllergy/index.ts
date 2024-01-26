import { NextApiRequest } from "next";

export interface UpdateAllergyNextApiRequest extends NextApiRequest {
  body: {
    uid: string;
    differences: {
      allergyId: number;
      isChecked: boolean;
    }[];
  };
}
