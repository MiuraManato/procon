import QRCodeComponent from "@/components/User/QRCode";
import useAuth from "@/features/hooks/useAuth";
import { useEffect, useState } from "react";

export const QRCode = () => {
  const [uid, setUid] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const user = useAuth();

  useEffect(() => {
    if (user === undefined) return;
    if (user === null) {
      window.location.href = "/user/auth/login";
      return;
    }
    setUid(user.uid);
    setLoading(false);
  }, [user]);

  if (loading) return <div>Loading...</div>;
  return (
    <>
      <div>QRCodePage</div>
      <QRCodeComponent text={uid} />
    </>
  );
};
