import { prisma } from "@/utils/Prisma/PrismaClient";
import { NextApiRequest, NextApiResponse } from "next";

const getUserHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { uid } = req.query;

  if (req.method === "GET") {
    const user = await prisma.user.findUnique({
      where: {
        userId: uid as string,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(user);
  }

  return res.status(405).json({ error: "Method not allowed" });
};

export default getUserHandler;
