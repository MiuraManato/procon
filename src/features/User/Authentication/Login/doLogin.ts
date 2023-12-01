import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { firebaseApp } from "@/utils/Firebase/firebaseConfig";

export const doLogin = async (email: string, password: string): Promise<boolean> => {
  const auth = getAuth(firebaseApp);
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // メール認証が完了しているか確認
    if (user.emailVerified) {
      return true;
    } else {
      // メール認証がされていないため、ログアウト処理を行う
      await signOut(auth);
      console.error("メール認証が完了していません。");
      return false;
    }
  } catch (e) {
    console.error(e);
    return false;
  }
};
