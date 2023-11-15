import { MenuData } from "@/features/Order/Menu/type";
import styles from "./index.module.css";
import { useState } from "react";

export const CategoryMenu = ({ menuData }: { menuData: MenuData }) => {
  const [nowCategoryId, setNowCategoryId] = useState<number | null>(menuData[0].menuId);
  const [nowPage, setNowPage] = useState<number>(1);

  const handleSetNowCategory = (menuId: number) => {
    setNowCategoryId(menuId);
    setNowPage(1);
  };

  console.log(menuData);
  return (
    <>
      <div className={`${styles["menu-container"]}`}>
        {menuData.map((menu) => (
          <>
            <div key={menu.menuCategoryName} className={`${styles["category-container"]}`}>
              <button className={`${styles["category-button"]}`} onClick={() => handleSetNowCategory(menu.menuId)}>
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
            nowCategoryId === menu.menuId && (
              <div key={menu.menuId} className={styles["menu-list"]}>
                {menu.menuProducts.map(
                  (menuProduct) =>
                    menuProduct.pages === nowPage && (
                      <div key={menuProduct.menuProductId} className={styles["product-item"]}>
                        <p>{menuProduct.product.productName}</p>
                        <p>{menuProduct.product.price}</p>
                      </div>
                    ),
                )}
              </div>
            ),
        )}
        <div className={`${styles["cart-container"]}`}>
          <p className={`${styles["cart-title"]}`}>現在のカート</p>
          <div className={`${styles["cart-product"]}`}>商品１</div>
          <div className={`${styles["cart-product"]}`}>商品２</div>
        </div>
      </div>
      <div>
        {menuData.map(
          (menu) =>
            nowCategoryId === menu.menuId &&
            [...Array(menu.menuProducts[menu.menuProducts.length - 1].pages)].map((_, index) => (
              <button
                className={`${styles["page-button"]} ${
                  nowPage === index + 1 ? styles["page-button-active"] : styles["page-button"]
                }`}
                onClick={() => setNowPage(index + 1)}
              >
                {index + 1}
              </button>
            )),
        )}
      </div>
    </>
  );
};
