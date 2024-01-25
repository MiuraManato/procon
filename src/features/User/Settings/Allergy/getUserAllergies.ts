import { prisma } from "@/utils/Prisma/PrismaClient";

export const getAllergies = async () => {
  const userAllergies = await prisma.userAllergy.findMany({
    select: {
      userAllergyId: true,
      userId: true,
      allergyId: true,
    },
  });
  return { userAllergies };
};
