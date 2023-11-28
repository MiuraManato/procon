import { Order } from "./type";
import { formatTime } from "@/utils/Formatters/formatTime";
import { useState } from "react";
import { ORDERSTATUS } from "@prisma/client";
import styles from "./index.module.css";

export const OrderList = ({ orders }: { orders: Order[] }) => {
  // オーダー一覧を管理するstate
  const [orderList, setOrderList] = useState<Order[]>(orders);
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

      return {
        ...currentOrder,
        orderDetail: currentOrder.orderDetail.map((detail) =>
          detail.orderDetailId === orderDetailId ? { ...detail, orderStatus: newStatus } : detail,
        ),
      };
    });
  };

  // モーダルを閉じる関数
  const handleCloseModal = async () => {
    // 選択されたオーダーの最新のステータスを取得する
    const updatedOrderDetails = selectedOrder?.orderDetail.map((detail) => ({
      orderDetailId: detail.orderDetailId,
      orderStatus: detail.orderStatus,
    }));

    if (updatedOrderDetails) {
      try {
        const response = await fetch("/api/order/detail/update", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ updates: updatedOrderDetails }),
        });

        // 表示するオーダーステータスを更新する
        if (response.ok) {
          const updatedOrderList = orderList.map((order) => {
            if (order.orderId === selectedOrder?.orderId) {
              return {
                ...order,
                orderDetail: order.orderDetail.map((detail) => {
                  const updatedDetail = updatedOrderDetails.find(
                    (updatedDetail) => updatedDetail.orderDetailId === detail.orderDetailId,
                  );
                  if (updatedDetail) {
                    return {
                      ...detail,
                      orderStatus: updatedDetail.orderStatus,
                    };
                  }
                  return detail;
                }),
              };
            }
            return order;
          });

          setOrderList(updatedOrderList);
        } else if (!response.ok) {
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
            {orderList.map((order) => (
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
