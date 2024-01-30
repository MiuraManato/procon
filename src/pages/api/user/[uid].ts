import { prisma } from "@/utils/Prisma/PrismaClient";
import { NextApiRequest, NextApiResponse } from "next";

const getUserHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { uid } = req.query;

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        userId: uid as string,
      },
      include: {
        allergies: true,
        preferences: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error during user findUnique:", error);
    return res.status(500).json({ error: "Error during get user findUnique" });
  } finally {
    await prisma.$disconnect();
  }
};

export default getUserHandler;
