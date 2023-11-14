import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseApp } from "@/utils/Firebase/firebaseConfig";

export const doLogin = async (email: string, password: string): Promise<boolean> => {
  const auth = getAuth(firebaseApp);
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
