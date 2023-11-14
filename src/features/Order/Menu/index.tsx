import { MenuData } from "@/features/Order/Menu/type";
import styles from "./index.module.css";

export const CategoryMenu = ({ menuData }: { menuData: MenuData }) => {
  console.log(menuData);
  return (
    <>
      <div className={`${styles["menu-container"]}`}>
        {menuData.map((menu) => (
          <div key={menu.menuCategoryName} className={`${styles["category-container"]}`}>
            <p className={`${styles["category-list"]}`}>{menu.menuCategoryName}</p>
          </div>
        ))}
      </div>
    </>
  );
};
