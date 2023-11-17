import { prisma } from "@/utils/Prisma/PrismaClient";

export const getUserData = async (userId: string) => {
  try {
    const user = await prisma.user.findMany({
      where: {
        userId,
      },
    });
    return user;
  } catch (error) {
    throw new Error("Failed to fetch user data");
  }
};
