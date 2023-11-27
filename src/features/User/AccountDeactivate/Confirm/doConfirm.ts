import { getAuth, deleteUser, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { firebaseApp } from "@/utils/Firebase/firebaseConfig";

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

    // 再認証が成功したらユーザーアカウントを削除
    await deleteUser(user);

    return true; // 削除成功を示すtrueを返す
  } catch (error) {
    console.error(error);
    return false; // 削除失敗を示すfalseを返す
  }
};
