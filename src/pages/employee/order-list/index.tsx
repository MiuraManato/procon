import { EmployeeHeader } from "@/components/Employee/Header";
import { OrderList } from "@/features/Employee/OrderList";
import { getOrders } from "@/features/Employee/OrderList/getOrders";
import { Order } from "@/features/Employee/OrderList/type";
import { getTables } from "@/features/Employee/Top/getTables";
import { Tables } from "@/features/Employee/Top/type";

const OrderListPage = ({ orders, tables }: { orders: Order[]; tables: Tables }) => {
  return (
    <>
      <EmployeeHeader />
      <OrderList orders={orders} tables={tables} />
    </>
  );
};

export const getServerSideProps = async () => {
  const orders = await getOrders();
  const tables = await getTables();

  return {
    props: {
      orders,
      tables,
    },
  };
};

export default OrderListPage;
