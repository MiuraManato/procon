import { MenuData } from "@/features/Order/Menu/type";
import styles from "./index.module.css";
import { useState } from "react";

export const CategoryMenu = ({ menuData }: { menuData: MenuData }) => {
  const [nowCategory, setNowCategory] = useState<string | null>(menuData[0].menuCategoryName);
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
        <div className={`${styles["utilities-container"]}`}>
          <button className={`${styles["category-button"]}`}>
            <p className={`${styles["category-list"]}`}>フィルター</p>
          </button>
        </div>
        <div className={`${styles["utilities-container"]}`}>
          <button className={`${styles["category-button"]}`}>
            <p className={`${styles["category-list"]}`}>注文履歴</p>
          </button>
        </div>
        <div className={`${styles["utilities-container"]}`}>
          <button className={`${styles["category-button"]}`}>
            <p className={`${styles["category-list"]}`}>ログイン</p>
          </button>
        </div>
        <div className={`${styles["utilities-container"]}`}>
          <button className={`${styles["category-button"]}`}>
            <p className={`${styles["category-list"]}`}>呼び出し</p>
          </button>
        </div>
        <div className={`${styles["utilities-container"]}`}>
          <button className={`${styles["category-button"]}`}>
            <p className={`${styles["category-list"]}`}>会計</p>
          </button>
        </div>
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
        <div className={`${styles["cart-container"]}`}>
          <p className={`${styles["cart-title"]}`}>現在のカート</p>
          <div className={`${styles["cart-product"]}`}>商品１</div>
          <div className={`${styles["cart-product"]}`}>商品２</div>
        </div>
      </div>
    </>
  );
};
