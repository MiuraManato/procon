import { FirebaseError } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, updatePassword } from "firebase/auth";
import useAuth from "@/features/hooks/useAuth";
import { firebaseApp } from "@/utils/Firebase/firebaseConfig";

export const DoChangePassword = async (oldPassword: string, newPassword: string): Promise<boolean> => {
  const user = useAuth();
  try {
    const auth = getAuth(firebaseApp);
    if (user === null || user.email === null) {
      return false;
    }
    const email = user.email;
    await signInWithEmailAndPassword(auth, email, oldPassword);
    await updatePassword(user, newPassword);
    return true;
  } catch (e) {
    if (e instanceof FirebaseError) throw new Error(e.message);
    return false;
  }
};
