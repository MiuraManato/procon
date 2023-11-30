// Prismaのインスタンスをimport
import { prisma } from "@/utils/Prisma/PrismaClient";

// Next.jsのAPIレスポンスとリクエストをimport
import { NextApiResponse } from "next";
import { NextApiRequestExtendsUser } from "@/types/api/signup";

// ユーザー削除リクエストのハンドラー関数
const confirmHandler = async (req: NextApiRequestExtendsUser, res: NextApiResponse) => {
  // リクエストからユーザーIDを取得
  const { uid } = req.body;

  // ユーザーIDが無効な場合はエラーを返す
  if (!uid) {
    return res.status(400).json({ message: "Invalid request" });
  }

  // Firebaseでの削除が完了した後、データベースの更新処理を実行
  try {
    // Prismaを使用してユーザー情報を更新
    const updatedUser = await prisma.user.update({
      where: {
        userId: uid, // 削除対象のユーザーのIDを指定
      },
      data: {
        isDeleted: true, // ユーザーを削除済みにマーク
        deletedAt: new Date(), // 削除した時刻を設定
      },
    });

    // 更新が成功した場合は成功レスポンスを返す
    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (e) {
    // エラーが発生した場合はエラーレスポンスを返す
    res.status(500).json({ message: "Something went wrong. Please try again later." });
  } finally {
    // Prismaとの接続を切断
    await prisma.$disconnect();
  }
};

export default confirmHandler;
