import { Order } from "./type";
import { formatTime } from "@/utils/Formatters/formatTime";
import styles from "./index.module.css";

export const OrderList = ({ orders }: { orders: Order[] }) => {
  console.log(orders);

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
                <button>変更</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
