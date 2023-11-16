import { getAuth, signInWithEmailAndPassword, updatePassword } from "firebase/auth";
import { firebaseApp } from "@/utils/Firebase/firebaseConfig";

/**
 * パスワード変更処理。ログイン処理をして、ログイン出来たらパスワードを変更する
 *
 * @param oldPassword
 * @param newPassword
 * @returns
 */
export const doChangePassword = async (oldPassword: string, newPassword: string): Promise<boolean> => {
  const auth = getAuth(firebaseApp);
  const user = auth.currentUser;
  if (user === null || user.email === null) {
    return false;
  }

  const email = user.email;
  const passPassword = await signInWithEmailAndPassword(auth, email, oldPassword)
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });

  const res = passPassword
    ? await updatePassword(user, newPassword)
        .then(() => {
          return true;
        })
        .catch(() => {
          return false;
        })
    : false;
  return res;
};
