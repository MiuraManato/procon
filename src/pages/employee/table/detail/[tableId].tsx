import { EmployeeHeader } from "@/components/Employee/Header";
import { TableDetail } from "@/features/Employee/Table/Detail";
import { getTable } from "@/features/Employee/Top/getTables";
import { Table } from "@/features/Employee/Table/Detail/type";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";

const TableDetailPage = ({ table }: { table: Table }) => {
  return (
    <>
      <EmployeeHeader />
      <TableDetail table={table} />
    </>
  );
};

const extractTableId = (params: ParsedUrlQuery): number | null => {
  const tableId = params.tableId;
  if (typeof tableId === "string") {
    const parsedId = parseInt(tableId, 10);
    return isNaN(parsedId) ? null : parsedId;
  }
  return null;
};

const fetchTableData = async (tableId: number) => {
  try {
    const table = await getTable(tableId);
    return table;
  } catch (error) {
    console.error("Failed to fetch table data:", error);
    return null;
  }
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const tableId = context.params ? extractTableId(context.params) : null;

  if (tableId === null) {
    return {
      notFound: true,
    };
  }

  const table = await fetchTableData(tableId);

  if (!table) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      table,
    },
  };
};

export default TableDetailPage;
