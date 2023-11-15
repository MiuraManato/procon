import { FirebaseError } from "firebase/app";
import { User, getAuth, signInWithEmailAndPassword, updatePassword } from "firebase/auth";
import { firebaseApp } from "@/utils/Firebase/firebaseConfig";

export const doChangePassword = async (user: User, oldPassword: string, newPassword: string): Promise<boolean> => {
  const auth = getAuth(firebaseApp);
  try {
    if (user === null || user.email === null) {
      return false;
    }
    const email = user.email;
    await signInWithEmailAndPassword(auth, email, oldPassword)
      .then(() => {
        updatePassword(user, newPassword)
          .then(() => {
            console.log("success")
            return true;
          })
          .catch(() => {
            console.log("fail")
            return false;
          });
      })
      .catch((e) => {
        if (e instanceof FirebaseError) throw new Error(e.message);
      });
  } catch (e) {
    if (e instanceof FirebaseError) throw new Error(e.message);
  }
  return false;
};
