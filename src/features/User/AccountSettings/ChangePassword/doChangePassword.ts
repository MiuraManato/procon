import { FirebaseError } from "firebase/app";
import { updatePassword } from "firebase/auth";
import useAuth from "@/features/hooks/useAuth";

export const DoChangePassword = async (newPassword: string): Promise<boolean> => {
  try {
    const user = useAuth();
    if (user === null) {
      return false;
    }
    await updatePassword(user, newPassword);
    return true;
  } catch (e) {
    if (e instanceof FirebaseError) throw new Error(e.message);
    return false;
  }
};
