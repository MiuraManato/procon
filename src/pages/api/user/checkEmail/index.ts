import { prisma } from "@/utils/Prisma/PrismaClient";
import { NextApiResponse } from "next";
import { NextApiRequestWithEmail } from "@/types/api/user/checkemail";

const checkEmailHandler = async (req: NextApiRequestWithEmail, res: NextApiResponse) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Invalid request" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user: user });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong. Please try again later." });
  } finally {
    await prisma.$disconnect();
  }
};

export default checkEmailHandler;
