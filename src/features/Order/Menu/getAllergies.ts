import { prisma } from "@/utils/Prisma/PrismaClient";

export const getAllergies = async () => {
  const allergies = await prisma.allergy.findMany({
    select: {
      allergyId: true,
      allergyName: true,
    },
  });
  return allergies;
};
