import { EmployeeHeader } from "@/components/Employee/Header";
import { EmployeeTop } from "@/features/Employee/Top";
import { getTables } from "@/features/Employee/Top/getTables";
import { Tables } from "@/features/Employee/Top/type";

const EmployeeTopPage = ({ tables }: { tables: Tables }) => {
  return (
    <div>
      <EmployeeHeader />
      <EmployeeTop tables={tables} />
    </div>
  );
};

export const getServerSideProps = async () => {
  const tables = await getTables();

  return {
    props: {
      tables,
    },
  };
};

export default EmployeeTopPage;
