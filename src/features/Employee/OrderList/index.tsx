import { Order } from "./type";
import { formatTime } from "@/utils/Formatters/formatTime";
import styles from "./index.module.css";
import { useState } from "react";

export const OrderList = ({ orders }: { orders: Order[] }) => {
  // モーダルの表示状態を管理するstate
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 選択されたオーダーを管理するstate
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // モーダルを開く関数
  const handleOpenModal = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  // モーダルを閉じる関数
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // モーダルの外側をクリックした時にモーダルを閉じる関数
  const handleClickOutside = () => {
    setIsModalOpen(false);
  };

  // モーダル内の要素をクリックした時にモーダルを閉じないようにする関数
  const handleCLickModal = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <>
      <div className={styles["container"]}>
        <h1>オーダー一覧</h1>
        <div className={styles["order-list"]}>
          <div className={styles["order-container"]}>
            {orders.map((order) => (
              <div key={order.orderId} className={styles["order-card"]}>
                <div className={styles["order-header"]}>
                  <h2>{order.storeTable.tableName}</h2>
                  <p>{formatTime(order.orderedAt)}</p>
                </div>
                <ul className={styles["order-details"]}>
                  {order.orderDetail.map((detail) => (
                    <li key={detail.orderDetailId} className={styles["order-item"]}>
                      <span>{detail.product.productName}</span>
                      <span>×{detail.quantity}</span>
                    </li>
                  ))}
                </ul>
                <button className={styles["button"]} onClick={() => handleOpenModal(order)}>
                  変更
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {isModalOpen && selectedOrder && (
        <div className={styles.modal} onClick={handleClickOutside}>
          <div className={styles.modalContent} onClick={handleCLickModal}>
            <h2>{selectedOrder.storeTable.tableName}</h2>
            <button className={styles["button"]} onClick={handleCloseModal}>
              閉じる
            </button>
          </div>
        </div>
      )}
    </>
  );
};
