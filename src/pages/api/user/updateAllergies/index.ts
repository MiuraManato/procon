import { prisma } from "@/utils/Prisma/PrismaClient";
import { NextApiResponse } from "next";
import { UpdateAllergyNextApiRequest } from "@/types/api/updateAllergy";

const updateAllergyHandler = async (req: UpdateAllergyNextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { uid, differences } = req.body;

  try {
    const deleteIds = differences.filter((diff) => !diff.isChecked).map((diff) => diff.allergyId);
    const createIds = differences.filter((diff) => diff.isChecked).map((diff) => diff.allergyId);

    await Promise.all([
      await prisma.userAllergy.deleteMany({
        where: {
          userId: uid,
          allergyId: {
            in: deleteIds,
          },
        },
      }),

      await prisma.userAllergy.createMany({
        data: createIds.map((id) => ({
          userId: uid,
          allergyId: id,
        })),
      }),
    ]);

    return res.status(200).json({ message: "Success" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default updateAllergyHandler;
