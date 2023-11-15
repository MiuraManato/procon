import { FirebaseError } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, updatePassword } from "firebase/auth";
import { firebaseApp } from "@/utils/Firebase/firebaseConfig";

export const doChangePassword = async (oldPassword: string, newPassword: string): Promise<boolean> => {
  const auth = getAuth(firebaseApp);
  const user = auth.currentUser;
  let res;
  try {
    if (user === null || user.email === null) {
      return false;
    }
    const email = user.email;
    res = await signInWithEmailAndPassword(auth, email, oldPassword).then(async () => {
      return await updatePassword(user, newPassword)
        .then(() => {
          console.log("success");
          return true;
        })
        .catch(() => {
          console.log("fail");
          return false;
        });
    });
    if (typeof res === "boolean") {
      return res;
    } else {
      return false;
    }
  } catch (e) {
    if (e instanceof FirebaseError) throw new Error(e.message);
  }
  return false;
};
