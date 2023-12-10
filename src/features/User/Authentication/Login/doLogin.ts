import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { firebaseApp } from "@/utils/Firebase/firebaseConfig";

export const doLogin = async (email: string, password: string): Promise<boolean> => {
  let errorMessage = "メールアドレスまたはパスワードが間違っています。";
  const auth = getAuth(firebaseApp);
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // メール認証が完了しているか確認
    if (user.emailVerified) {
      return true;
    } else {
      // メール認証がされていない場合にエラーを返す
      errorMessage = "メール認証が完了していません。";
      throw new Error(errorMessage);
    }
  } catch (e) {
    // ログインに失敗した場合にエラーを返す
    await signOut(auth);
    throw new Error(errorMessage);
  }
};
