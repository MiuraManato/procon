import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseApp } from "@/utils/Firebase/firebaseConfig";
import { User } from "@prisma/client";

// 従業員ログイン処理
export const doEmployeeLogin = async (email: string, password: string): Promise<boolean> => {
  const auth = getAuth(firebaseApp);
  try {
    await signInWithEmailAndPassword(auth, email, password);
    const user = auth.currentUser;
    if (!user) throw new Error("User not found");

    const userData: User = await fetch(`/api/user/${user.uid}`).then((res: Response): Promise<User> => res.json());
    // 従業員以上の権限がある場合はtrueを返す
    if (userData.authority >= 1) {
      return true;
    } else {
      await auth.signOut();
      throw new Error("Not enough authority");
    }
  } catch (e) {
    await auth.signOut();
    throw new Error("メールアドレスまたはパスワードが間違っています。");
  }
};
