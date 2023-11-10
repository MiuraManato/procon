import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseApp } from "@/utils/Firebase/firebaseConfig";

export const doLogin = async (email: string, password: string): Promise<boolean> => {
  try {
    const auth = getAuth(firebaseApp);
    await signInWithEmailAndPassword(auth, email, password);
    return true;
  } catch (error) {
    return false;
  }
};
