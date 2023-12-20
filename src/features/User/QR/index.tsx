import QRCodeComponent from "@/components/User/QRCode";
import useAuth from "@/features/hooks/useAuth";
import { useEffect, useState } from "react";

export const QRCode = () => {
  const [uid, setUid] = useState<string>("");

  const user = useAuth();

  useEffect(() => {
    if (user === undefined) return;
    if (user === null) {
      window.location.href = "/user/auth/login";
      return;
    }
    setUid(user.uid);
  }, [user]);

  return (
    <>
      <div>QRCodePage</div>
      <QRCodeComponent text={uid} />
    </>
  );
};
