import { TableSettings } from "@/features/Order/Employee/Settings/Table";
import { getTables } from "@/features/Order/Employee/Settings/Table/getTables";
import { storeTable } from "@/features/Order/Employee/Settings/Table/type";

const OrderEmployeeSettingsTablePage = ({ tables }: { tables: storeTable }) => {
  return <TableSettings tables={tables} />;
};

export const getServerSideProps = async () => {
  const tables = await getTables();

  return {
    props: {
      tables,
    },
  };
};

export default OrderEmployeeSettingsTablePage;
