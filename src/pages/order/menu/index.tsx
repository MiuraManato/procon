import { CategoryMenu } from "@/features/Order/Menu";
import { getMenuData } from "@/features/Order/Menu/getMenu";
import { MenuData } from "@/features/Order/Menu/type";
import { getAllergies } from "@/features/Order/Menu/getAllergies";
import { Allergy } from "@prisma/client";
import MetaData from "@/features/Order/Menu/metadata";

const MenuPage = ({ menuData, allergies }: { menuData: MenuData; allergies: Allergy[] }) => {
  return (
    <>
      <MetaData />
      <CategoryMenu menuData={menuData} allergies={allergies} />;
    </>
  );
};

export const getServerSideProps = async () => {
  const menuData = await getMenuData();
  const allergies = await getAllergies();

  return {
    props: {
      menuData,
      allergies,
    },
  };
};

export default MenuPage;
