import { auth } from "@/utils/Firebase/firebaseConfig";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

export const doSignup = async (email: string, password: string): Promise<boolean> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await sendEmailVerification(user);
    return true;
  } catch (e) {
    if (e instanceof FirebaseError) throw new Error(e.message);
    return false;
  }
};
