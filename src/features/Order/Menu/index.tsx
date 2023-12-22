import { MenuData } from "@/features/Order/Menu/type";
import styles from "./index.module.css";
import React, { useEffect, useState } from "react";
import { Allergy, User } from "@prisma/client";
import { QrReader } from "react-qr-reader";

export const CategoryMenu = ({ menuData, allergies }: { menuData: MenuData; allergies: Allergy[] }) => {
  const [LoginUsers, setLoginUsers] = useState<User[]>([]);
  const [nowCategoryId, setNowCategoryId] = useState<number | null>(menuData[0].menuId);
  const [nowPage, setNowPage] = useState<number>(1);
  const [isOpenedFilterModal, setIsOpenedFilterModal] = useState<boolean>(false);
  const [allergyFilter, setAllergyFilter] = useState<number[]>([]);
  const [productModal, setProductModal] = useState<number | null>(null);
  const [loginModal, setLoginModal] = useState<boolean>(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState<string>("");
  const [cart, setCart] = useState<{ id: number; count: number }[]>([]);
  const [table, setTable] = useState<number | null>(null);

  const handleSetNowCategory = (menuId: number) => {
    setNowCategoryId(menuId);
    setNowPage(1);
  };

  const handleSetAllergyFilter = (allergyId: number) => {
    setAllergyFilter((prevFilter) =>
      prevFilter.includes(allergyId) ? prevFilter.filter((filter) => filter !== allergyId) : [...prevFilter, allergyId],
    );
  };

  const handleSetIsOpenedFilterModal = () => {
    setIsOpenedFilterModal(!isOpenedFilterModal);
  };

  const handleCallingTable = async () => {
    const res = await fetch(`/api/table/UpdateCalling/${table}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ callingStatus: true }),
    });
    if (!res.ok) {
      throw new Error("UpdateCalling failed");
    }
  };

  const handleModalOutsideClick = () => {
    setIsOpenedFilterModal(false);
  };

  const handleProductModalOutsideClick = () => {
    setProductModal(null);
  };

  const handleLoginModalOutsideClick = () => {
    setLoginModal(false);
    setLoginErrorMessage("");
  };

  const handleSetOpenLoginModal = () => {
    setLoginModal(true);
  };

  const handleModalInsideClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const tryLogin = async (uid: string) => {
    try {
      const res = await fetch(`/api/user/${uid}`);
      if (!res.ok) {
        setLoginErrorMessage("ログインに失敗しました");
        return;
      }
      const data: User = (await res.json()) as User;
      setLoginUsers((prevUsers) => {
        // 同じIDのユーザーが既に存在するかどうかを確認
        const isUserExists = prevUsers.some((user) => user.userId === data.userId);
        if (!isUserExists) {
          // 存在しない場合、ユーザーをリストに追加
          return [...prevUsers, data];
        } else {
          // 既に存在する場合はリストをそのまま返す
          return prevUsers;
        }
      });
    } catch (error) {
      setLoginErrorMessage("ログインに失敗しました");
    }
  };

  // カートに商品を追加する関数
  const addCart = (e: React.MouseEvent, menuProductId: number) => {
    e.stopPropagation();
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === menuProductId);
      if (existingItem) {
        // 既存の商品の数量を増やす
        return prevCart.map((item) => (item.id === menuProductId ? { ...item, count: item.count + 1 } : item));
      } else {
        // 新しい商品を追加
        return [...prevCart, { id: menuProductId, count: 1 }];
      }
    });
  };

  const decrementItem = (e: React.MouseEvent, menuProductId: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === menuProductId);
      if (existingItem) {
        // 既存の商品の数量を減らす
        if (existingItem.count - 1 === 0) {
          // 商品の数量が0になったら、その商品をカートから削除
          return prevCart.filter((item) => item.id !== menuProductId);
        } else {
          // それ以外の場合は、商品の数量を減らす
          return prevCart.map((item) => (item.id === menuProductId ? { ...item, count: item.count - 1 } : item));
        }
      } else {
        // 新しい商品を追加
        return [...prevCart, { id: menuProductId, count: 1 }];
      }
    });
  };

  useEffect(() => {
    const table = Number(localStorage.getItem("table"));
    if (table) {
      setTable(table);
    }
  }, []);

  return (
    <>
      <div className={styles["menu-container"]}>
        {menuData.map((menu) => (
          <>
            <div key={menu.menuCategoryName} className={styles["category-container"]}>
              <button
                className={`${styles["category-button"]}
                ${menu.menuId === nowCategoryId ? styles["category-button-active"] : styles["category-button"]}`}
                onClick={() => handleSetNowCategory(menu.menuId)}
              >
                <p className={styles["category-list"]}>{menu.menuCategoryName}</p>
              </button>
            </div>
          </>
        ))}
        <div className={styles["utilities-container"]}>
          <button className={styles["category-button"]} onClick={() => handleSetIsOpenedFilterModal()}>
            <p className={styles["category-list"]}>フィルター</p>
          </button>
        </div>
        <div className={styles["utilities-container"]}>
          <button className={styles["category-button"]}>
            <p className={styles["category-list"]}>注文履歴</p>
          </button>
        </div>
        <div className={styles["utilities-container"]}>
          <button className={styles["category-button"]} onClick={() => handleSetOpenLoginModal()}>
            <p className={styles["category-list"]}>ログイン</p>
          </button>
        </div>
        <div className={styles["utilities-container"]}>
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <button className={styles["category-button"]} onClick={() => handleCallingTable()}>
            <p className={styles["category-list"]}>呼び出し</p>
          </button>
        </div>
        <div className={styles["utilities-container"]}>
          <button className={styles["category-button"]}>
            <p className={styles["category-list"]}>会計</p>
          </button>
        </div>
        {menuData.map(
          (menu) =>
            nowCategoryId === menu.menuId && (
              <div key={menu.menuId} className={styles["menu-list"]}>
                {menu.menuProducts
                  .filter(
                    (menuProduct) =>
                      !menuProduct.product.productAllergies.some((allergy) =>
                        allergyFilter.includes(allergy.allergyId),
                      ),
                  )
                  .filter((menuProduct) => menuProduct.pages === nowPage)
                  .map((menuProduct) => (
                    <div
                      key={menuProduct.menuProductId}
                      className={styles["product-item"]}
                      onClick={() => setProductModal(menuProduct.product.productId)}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={menuProduct.product.imageUrl} alt="product" />
                      <div className={styles.productName}>{menuProduct.product.productName}</div>
                      <div className={styles.productPrice}>{menuProduct.product.price}</div>
                      <div className={styles.cartButton}>
                        <button onClick={(e) => addCart(e, menuProduct.menuProductId)}>カートに入れる</button>
                      </div>
                    </div>
                  ))}
              </div>
            ),
        )}
        <div className={styles["cart-container"]}>
          <p className={styles["cart-title"]}>現在のカート</p>
          {cart.map((item) => (
            <div key={item.id} className={styles["cart-item"]}>
              {menuData
                .map((menu) => menu.menuProducts)
                .flat()
                .filter((menuProduct) => menuProduct.menuProductId === item.id)
                .map((menuProduct) => (
                  <>
                    <div className={styles["cart-item-name"]}>{menuProduct.product.productName}</div>
                    <div className={styles["cart-item-price"]}>{menuProduct.product.price}</div>
                    <div className={styles["cart-item-count"]}>数量: {item.count}</div>
                    <div>
                      <button onClick={(e) => addCart(e, menuProduct.menuProductId)}>+</button>
                      <button onClick={(e) => decrementItem(e, menuProduct.menuProductId)}>-</button>
                    </div>
                  </>
                ))}
            </div>
          ))}
        </div>
      </div>
      <div>
        {menuData.map(
          (menu) =>
            nowCategoryId === menu.menuId &&
            [...Array<number>(menu.menuProducts[menu.menuProducts.length - 1].pages)].map((_, index) => (
              <button
                key={index + 1}
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
      {isOpenedFilterModal && (
        <div className={styles["modal"]} onClick={handleModalOutsideClick}>
          <div className={styles["filter-modal"]} onClick={handleModalInsideClick}>
            {allergies.map((allergy) => (
              <button
                key={allergy.allergyId}
                onClick={() => handleSetAllergyFilter(allergy.allergyId)}
                className={
                  allergyFilter.includes(allergy.allergyId) ? styles["filter-button-active"] : styles["filter-button"]
                }
              >
                {allergy.allergyName}
              </button>
            ))}
          </div>
        </div>
      )}
      {productModal && (
        <div className={styles["modal"]} onClick={handleProductModalOutsideClick}>
          <div className={styles["product-modal"]} onClick={handleModalInsideClick}>
            {menuData
              .map((menu) => menu.menuProducts)
              .flat()
              .filter((menuProduct) => menuProduct.menuProductId === productModal)
              .map((menuProduct) => (
                <>
                  <div className={styles["product-modal-content"]} key={menuProduct.menuProductId}>
                    <div className={styles["product-modal-details"]}>
                      <div className={styles["product-modal-name"]}>{menuProduct.product.productName}</div>
                      <div className={styles["product-modal-price"]}>{menuProduct.product.price}</div>
                      <div className={styles["product-modal-description"]}>{menuProduct.product.description}</div>
                      <div className={styles["product-modal-allergies"]}>
                        <div className={styles["product-modal-allergies-pre"]}>アレルギー：</div>
                        {menuProduct.product.productAllergies.map((allergy) => (
                          <div key={allergy.allergyId} className={styles["product-modal-allergies-item"]}>
                            {allergy.allergy.allergyName}
                          </div>
                        ))}
                      </div>
                      <div className={styles["product-modal-allergies"]}>
                        <div className={styles["product-modal-allergies-pre"]}>使用食材：</div>
                        {menuProduct.product.productIngredients.map((ingredient) => (
                          <div key={ingredient.ingredientId} className={styles["product-modal-allergies-item"]}>
                            {ingredient.ingredient.ingredientName}
                          </div>
                        ))}
                      </div>
                      <div className={styles.cartButton}>
                        <button onClick={(e) => addCart(e, menuProduct.menuProductId)}>カートに入れる</button>
                      </div>
                    </div>
                    <div className={styles["product-modal-image-container"]}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img className={styles["product-modal-image"]} src={menuProduct.product.imageUrl} alt="product" />
                    </div>
                  </div>
                </>
              ))}
          </div>
        </div>
      )}
      {loginModal && (
        <div className={styles["modal"]} onClick={handleLoginModalOutsideClick}>
          <div className={styles["product-modal"]} onClick={handleModalInsideClick}>
            <div className={styles["login-modal-content"]}>
              {loginErrorMessage && <div className={styles["login-modal-error"]}>{loginErrorMessage}</div>}
              <div className={styles["login-modal-title"]}>QRコードをかざしてください</div>
              <div className={styles["login-modal-qr-reader"]}>
                <QrReader
                  constraints={{ facingMode: "environment" }}
                  scanDelay={300}
                  onResult={(result, error) => {
                    if (error) {
                      return;
                    } else if (result) {
                      // 既にログインしているユーザーの場合は、ログインを行わない
                      if (LoginUsers.some((user) => user.userId === result["text"])) {
                        return;
                      }
                      // eslint-disable-next-line @typescript-eslint/no-floating-promises
                      tryLogin(result["text"] as string);
                    }
                  }}
                  containerStyle={{ width: "50%", height: "50%" }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};