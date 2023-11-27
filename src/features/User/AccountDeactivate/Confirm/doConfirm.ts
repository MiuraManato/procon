import { getAuth, deleteUser, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { firebaseApp } from "@/utils/Firebase/firebaseConfig";
import { prisma } from "@/utils/Prisma/PrismaClient";

export const doConfirm = async (password: string): Promise<boolean> => {
  const auth = getAuth(firebaseApp);
  const user = auth.currentUser;

  if (!user || !user.email) {
    throw new Error("ユーザーが存在しません。");
  }
  const credential = EmailAuthProvider.credential(user.email, password);

  try {
    // ユーザーを再認証
    await reauthenticateWithCredential(user, credential);

    // ユーザーアカウントを削除
    await deleteUser(user);

    // Firebaseでの削除が完了した後、データベースの更新処理を実行
    try {
      const updatedUser = await prisma.user.update({
        where: {
          userId: user.id, // ユーザーのIDを指定
        },
        data: {
          isDeleted: true,
          deletedAt: new Date(), // 削除した時刻を設定
        },
      });

      return true; // 削除成功を示すtrueを返す
    } catch (e) {
      console.error(e);
      return false; // 削除失敗を示すfalseを返す
    } finally {
      await prisma.$disconnect();
    }
  } catch (error) {
    console.error(error);
    return false; // 削除失敗を示すfalseを返す
  }
};
