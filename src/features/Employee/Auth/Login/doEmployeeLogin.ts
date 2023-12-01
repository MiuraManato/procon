import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseApp } from "@/utils/Firebase/firebaseConfig";
import { User } from "@prisma/client";

// 従業員ログイン処理
export const doEmployeeLogin = async (email: string, password: string): Promise<boolean> => {
  let errorMessage = "メールアドレスまたはパスワードが間違っています。";
  const auth = getAuth(firebaseApp);
  try {
    await signInWithEmailAndPassword(auth, email, password);
    const user = auth.currentUser;
    if (!user) throw new Error("User not found");

    const userData: User = await fetch(`/api/user/${user.uid}`).then((res: Response): Promise<User> => res.json());

    // メール認証が完了しているか確認
    if (!user.emailVerified) {
      errorMessage = "メール認証が完了していません。";
      throw new Error(errorMessage);
    }

    // 従業員以上の権限がある場合はtrueを返す
    if (userData.authority >= 1) {
      return true;
    } else {
      await auth.signOut();
      errorMessage = "権限がありません。";
      throw new Error(errorMessage);
    }
  } catch (e) {
    await auth.signOut();
    throw new Error(errorMessage);
  }
};
