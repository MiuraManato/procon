import { auth } from "@/utils/Firebase/firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";

export const doPasswordReset = async (email: string): Promise<boolean> => {
  try {
    const res = await fetch("/api/user/checkEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    if (res.ok) {
      await sendPasswordResetEmail(auth, email);
      return true;
    }
    return false;
  } catch (e) {
    console.error(e);
    return false;
  }
};
