import { prisma } from "@/utils/Prisma/PrismaClient";

export const getAllergies = () => {
  const allergies = prisma.allergy.findMany({
    select: {
      allergyId: true,
      allergyName: true,
    },
  });
  return allergies;
};
