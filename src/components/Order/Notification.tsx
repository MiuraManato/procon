import { useEffect } from "react";

interface NotificationProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "30px",
        right: "30px",
        backgroundColor: "lightblue",
        padding: "30px",
        borderRadius: "5px",
        fontSize: "20px",
      }}
    >
      {message}
    </div>
  );
};

export default Notification;
