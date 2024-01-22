import { QRCodeCanvas } from "qrcode.react";

const QRCodeComponent = ({ text, size }: { text: string; size: number }) => {
  return <QRCodeCanvas value={text} size={size} />;
};

export default QRCodeComponent;
