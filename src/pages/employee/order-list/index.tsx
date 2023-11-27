import { OrderList } from "@/features/Employee/OrderList";
import { getOrders } from "@/features/Employee/OrderList/getOrders";
import { Order } from "@/features/Employee/OrderList/type";

const OrderListPage = ({ orders }: { orders: Order[] }) => {
  return <OrderList orders={orders} />;
};

export const getServerSideProps = async () => {
  const orders = await getOrders();

  return {
    props: {
      orders,
    },
  };
};

export default OrderListPage;
