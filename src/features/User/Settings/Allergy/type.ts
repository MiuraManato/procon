import { User, Allergy } from "@prisma/client"

type UserAllergies = {
  user: User
  allergies: Allergy[]
}

export type { UserAllergies }