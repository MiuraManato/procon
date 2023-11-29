import { getAuth, deleteUser, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { firebaseApp } from "@/utils/Firebase/firebaseConfig";

export const doConfirm = async (password: string): Promise<boolean> => {
  try {
    const auth = getAuth(firebaseApp);
    const user = auth.currentUser;

    if (!user || !user.email) {
      throw new Error("ユーザーが存在しません。");
    }

    const credential = EmailAuthProvider.credential(user.email, password);

    // ユーザーを再認証
    await reauthenticateWithCredential(user, credential);

    // ユーザーアカウントを削除
    await deleteUser(user);

    // 削除成功を示すtrueを返す
    return true;
  } catch (error) {
    console.error(error);
    // 削除失敗を示すfalseを返す
    return false;
  }
};
