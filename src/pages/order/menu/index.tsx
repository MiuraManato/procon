import { CategoryMenu } from "@/features/Order/Menu";
import { getMenuData } from "@/features/Order/Menu/getMenu";
import { MenuData } from "@/features/Order/Menu/type";

const MenuPage = ({ menuData }: { menuData: MenuData }) => {
  console.log("Client-side menuData:", menuData);

  return <CategoryMenu menuData={menuData} />;
};

export const getServerSideProps = async () => {
  const menuData = await getMenuData();

  console.log("Server-side menuData:", menuData);

  return {
    props: {
      menuData,
    },
  };
};

export default MenuPage;
