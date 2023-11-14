import { MenuData } from "@/features/Order/Menu/type";
import styles from "./index.module.css";
import { useState } from "react";

export const CategoryMenu = ({ menuData }: { menuData: MenuData }) => {
  const [nowCategory, setNowCategory] = useState<string | null>(null);
  console.log(menuData);
  return (
    <>
      <div className={`${styles["menu-container"]}`}>
        {menuData.map((menu) => (
          <>
            <div key={menu.menuCategoryName} className={`${styles["category-container"]}`}>
              <button className={`${styles["category-button"]}`} onClick={() => setNowCategory(menu.menuCategoryName)}>
                <p className={`${styles["category-list"]}`}>{menu.menuCategoryName}</p>
              </button>
            </div>
          </>
        ))}
      </div>
      <div>
        {menuData.map(
          (menu) =>
            nowCategory === menu.menuCategoryName && (
              <div key={menu.menuId} className={styles["menu-list"]}>
                {menu.menuProducts.map((product) => (
                  <div key={product.menuProductId} className={styles["product-item"]}>
                    <p>{product.product.productName}</p>
                    <p>{product.product.price}</p>
                  </div>
                ))}
              </div>
            ),
        )}
      </div>
    </>
  );
};
