import router from "next/router";

const EmployeeButton = () => {
  return (
    <button
      onClick={() => {
        void router.push("/employee").then().catch();
      }}
    >
      従業員画面
    </button>
  );
};

export const OrderTop = () => {
  return (
    <div>
      <h1>OrderTop</h1>
      <EmployeeButton />
    </div>
  );
};
