import { Allergy } from "@prisma/client";

type Allergies = {
  allergies: Allergy[];
};

export type { Allergies };
