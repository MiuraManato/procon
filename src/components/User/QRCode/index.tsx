import { QRCodeCanvas } from "qrcode.react";

const QRCodeComponent = ({ text }: { text: string }) => {
  return <QRCodeCanvas value={text} size={150} />;
};

export default QRCodeComponent;
