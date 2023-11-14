import { CategoryMenu } from "@/features/Order/Menu";
import { getMenuData } from "@/features/Order/Menu/getMenu";
import { MenuData } from "@/features/Order/Menu/type";

const MenuPage = ({ menuData }: { menuData: MenuData }) => {
  return <CategoryMenu menuData={menuData} />;
};

export const getServerSideProps = async () => {
  const menuData = await getMenuData();

  return {
    props: {
      menuData,
    },
  };
};

export default MenuPage;
