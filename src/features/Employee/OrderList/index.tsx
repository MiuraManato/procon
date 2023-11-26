import { Order } from "./type";
import { formatTime } from "@/utils/Formatters/formatTime";
import { useState } from "react";
import { ORDERSTATUS } from "@prisma/client";
import styles from "./index.module.css";

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

  // ステータス更新関数
  const handleStatusChange = (e: React.MouseEvent, orderDetailId: number, newStatus: ORDERSTATUS) => {
    e.stopPropagation();
    setSelectedOrder((currentOrder) => {
      if (!currentOrder) return null;

      // 新しいorderDetail配列を作成
      const newOrderDetails = currentOrder.orderDetail.map((detail) =>
        detail.orderDetailId === orderDetailId ? { ...detail, orderStatus: newStatus } : detail,
      );

      // 新しいOrderオブジェクトを返す
      return { ...currentOrder, orderDetail: newOrderDetails };
    });
  };

  // モーダルを閉じる関数
  const handleCloseModal = async () => {
    if (selectedOrder) {
      const updates = selectedOrder.orderDetail.map((detail) => ({
        orderDetailId: detail.orderDetailId,
        newStatus: detail.orderStatus,
      }));

      try {
        const response = await fetch("/api/order/detail/update", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ updates }),
        });

        if (!response.ok) {
          throw new Error("Server error occurred");
        }

        console.log("All statuses updated successfully");
      } catch (error) {
        console.error("Error updating statuses", error);
      }
    }

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
            <ul className={styles["order-details"]}>
              {selectedOrder.orderDetail.map((detail) => (
                <li key={detail.orderDetailId}>
                  <span>{detail.product.productName}</span>
                  <span>
                    <button
                      className={
                        detail.orderStatus === ORDERSTATUS.COOKING ? styles["status-active"] : styles["status"]
                      }
                      onClick={(e) => handleStatusChange(e, detail.orderDetailId, ORDERSTATUS.COOKING)}
                    >
                      調理中
                    </button>
                    <button
                      className={detail.orderStatus === ORDERSTATUS.COOKED ? styles["status-active"] : styles["status"]}
                      onClick={(e) => handleStatusChange(e, detail.orderDetailId, ORDERSTATUS.COOKED)}
                    >
                      完成
                    </button>
                    <button
                      className={detail.orderStatus === ORDERSTATUS.SERVED ? styles["status-active"] : styles["status"]}
                      onClick={(e) => handleStatusChange(e, detail.orderDetailId, ORDERSTATUS.SERVED)}
                    >
                      お届け済み
                    </button>
                  </span>
                </li>
              ))}
            </ul>
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <button className={styles["button"]} onClick={handleCloseModal}>
              閉じる
            </button>
          </div>
        </div>
      )}
    </>
  );
};
