import { prisma } from "@/utils/Prisma/PrismaClient";
import { NextApiResponse } from "next";
import { NextApiRequestEditUser } from "@/types/api/edit-profile";

const updateUserHandler = async (req: NextApiRequestEditUser, res: NextApiResponse) => {
  const { id, firstName, lastName, age, email } = req.body;

  if (!id || !firstName || !lastName || !email) {
    return res.status(400).json({ message: "Invalid request" });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: {
        userId: id,
      },
      data: {
        firstName: firstName,
        lastName: lastName,
        age: age,
        email: email,
      },
    });

    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong. Please try again later." });
  } finally {
    await prisma.$disconnect();
  }
};

export default updateUserHandler;
