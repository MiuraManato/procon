import { prisma } from "@/utils/Prisma/PrismaClient";

export const getUserData = async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        userId:userId,
      },
    });
    return user;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch user data");
  }
};
