import { prisma } from "@/utils/Prisma/PrismaClient";
import { UpdateCallingRequest } from "@/types/api/table/calling";
import { NextApiResponse } from "next";

const updateCallingHandler = async (req: UpdateCallingRequest, res: NextApiResponse) => {
  const { stid } = req.query;

  // `stid` を数値に変換する。無効な場合はエラーを返す。
  const storeTableStatusId = parseInt(stid, 10);
  if (isNaN(storeTableStatusId)) {
    return res.status(400).json({ error: "Invalid storeTableStatusId" });
  }

  const { callingStatus } = req.body;

  if (req.method === "PUT") {
    try {
      const response = await prisma.storeTableStatus.update({
        where: {
          storeTableStatusId: storeTableStatusId,
        },
        data: {
          calling: callingStatus,
        },
      });

      // 更新が成功したら、更新されたオブジェクトを返す。
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error during storeTableStatus update:", error);
      return res.status(500).json({ error: "Error during update" });
    }
  }

  // PUTメソッド以外のリクエストに対して405エラーを返す。
  return res.status(405).json({ error: "Method not allowed" });
};

export default updateCallingHandler;
