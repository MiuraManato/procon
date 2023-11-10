import { PrismaClient } from "@prisma/client";
import { NextApiResponse } from "next";
import { NextApiRequestExtendsUser } from "@/types/api/signup";

const signupHandler = async (req: NextApiRequestExtendsUser, res: NextApiResponse) => {
  const prisma = new PrismaClient();
  const { uid, username, firstName, lastName, age, email } = req.body;
  if (!uid || !username || !firstName || !lastName || !email) {
    return res.status(400).json({ message: "Invalid request" });
  }

  try {
    const user = await prisma.user.create({
      data: {
        userId: uid,
        username: username,
        firstName: firstName,
        lastName: lastName,
        age: age,
        email: email,
      },
    });
    res.status(200).json({ message: "User created successfully", user });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong. Please try again later." });
  } finally {
    await prisma.$disconnect();
  }
};

export default signupHandler;
