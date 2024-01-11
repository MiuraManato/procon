import { MenuData } from "@/features/Order/Menu/type";
import styles from "./index.module.css";
import React, { useEffect, useState } from "react";
import { Allergy, User } from "@prisma/client";
import { QrReader } from "react-qr-reader";
import router from "next/router";
import Image from "next/image";

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
  const [isConfirmLoginModalOpen, setIsConfirmLoginModalOpen] = useState<boolean>(false);
  const [pendingLoginUser, setPendingLoginUser] = useState<User | null>(null);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [orderCheckModal, setOrderCheckModal] = useState<boolean>(false);
  const [isErrorTableId, setIsErrorTableId] = useState(false);

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
    alert("従業員を呼び出しました。しばらくお待ちください。");
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
      setPendingLoginUser(data);
      setIsConfirmLoginModalOpen(true);
    } catch (error) {
      setLoginErrorMessage("ログインに失敗しました");
    }
  };

  const confirmLogin = () => {
    if (pendingLoginUser) {
      setLoginUsers((prevUsers) => [...prevUsers, pendingLoginUser]);
      setPendingLoginUser(null);
    }
    setIsConfirmLoginModalOpen(false);
  };

  const handleUserIconClick = (userId: string) => {
    setShowLogoutConfirmation(true);
    setSelectedUserId(userId);
  };

  const logoutUser = () => {
    setLoginUsers((prevUsers) => prevUsers.filter((user) => user.userId !== selectedUserId));
    setShowLogoutConfirmation(false);
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

  const orderCheck = () => {
    setOrderCheckModal(true);
  };

  const handleOrder = async () => {
    const users = LoginUsers.map((user) => user.userId);
    const res = await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ table, cart, users }),
    });
    if (!res.ok) {
      throw new Error("Order failed");
    }
    setCart([]);
    setOrderCheckModal(false);
  }

  useEffect(() => {
    const table = Number(localStorage.getItem("table"));
    if (table) {
      setTable(table);
      setIsErrorTableId(false);
    } else {
      setIsErrorTableId(true);
    }
  }, []);

  return (
    <>
      <div className={styles["menu-container"]}>
        <div className={styles["menu-header"]}>
          {menuData.map((menu) => (
            <React.Fragment key={menu.menuId}>
              <div key={menu.menuCategoryName} className={styles["category-container"]}>
                <button
                  className={`${styles["category-button"]}
                ${menu.menuId === nowCategoryId ? styles["category-button-active"] : styles["category-button"]}`}
                  onClick={() => handleSetNowCategory(menu.menuId)}
                >
                  <p className={styles["category-list"]}>{menu.menuCategoryName}</p>
                </button>
              </div>
            </React.Fragment>
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
        </div>
        <div className={styles["menu-contents"]}>
          <div className={styles["menu-list-width"]}>
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
                          <img className={styles.productImage} src={menuProduct.product.imageUrl} alt="product" />
                          <div className={styles.productName}>{menuProduct.product.productName}</div>
                          <div className={styles.productPrice}>{menuProduct.product.price}円</div>
                          <div className={styles.cartButton}>
                            <button onClick={(e) => addCart(e, menuProduct.menuProductId)}>カートに入れる</button>
                          </div>
                        </div>
                      ))}
                  </div>
                ),
            )}
            <div>
              {menuData.map(
                (menu) =>
                  nowCategoryId === menu.menuId &&
                  [...Array<number>(menu.menuProducts[menu.menuProducts.length - 1].pages)].map((_, index) => (
                    <button
                      key={`${menu.menuId}-${index}`}
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
          </div>
          <div className={styles["cart-container"]}>
            <p className={styles["cart-title"]}>現在のカート</p>
            <div className={styles["cart-items"]}>
              {cart.map((item) => (
                <div key={item.id} className={styles["cart-item"]}>
                  {menuData
                    .map((menu) => menu.menuProducts)
                    .flat()
                    .filter((menuProduct) => menuProduct.menuProductId === item.id)
                    .map((menuProduct) => (
                      <React.Fragment key={menuProduct.menuProductId}>
                        <div className={styles["cart-item-name"]}>{menuProduct.product.productName}</div>
                        <div className={styles["cart-item-price"]}>{menuProduct.product.price}</div>
                        <div className={styles["cart-item-count"]}>数量: {item.count}</div>
                        <div>
                          <button onClick={(e) => addCart(e, menuProduct.menuProductId)}>+</button>
                          <button onClick={(e) => decrementItem(e, menuProduct.menuProductId)}>-</button>
                        </div>
                      </React.Fragment>
                    ))}
                </div>
              ))}
            </div>
            {cart.length > 0 && <button className={styles["cart-button"]} onClick={orderCheck}>注文する</button>}
          </div>
        </div>
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
                <React.Fragment key={menuProduct.productId}>
                  <div className={styles["product-modal-content"]} key={menuProduct.menuProductId}>
                    <div className={styles["product-modal-details"]}>
                      <div className={styles["product-modal-name"]}>{menuProduct.product.productName}</div>
                      <div className={styles["product-modal-price"]}>{menuProduct.product.price}円</div>
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
                </React.Fragment>
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
                  constraints={{ facingMode: "user" }}
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
      {isConfirmLoginModalOpen && (
        <div className={styles["modal"]} onClick={() => handleLoginModalOutsideClick()}>
          <div className={styles["confirm-login-modal"]} onClick={(e) => handleModalInsideClick(e)}>
            <p>以下のユーザーでログインしますか？</p>
            <p>{pendingLoginUser?.username}</p>
            <button onClick={confirmLogin}>ログイン</button>
            <button onClick={() => setIsConfirmLoginModalOpen(false)}>キャンセル</button>
          </div>
        </div>
      )}
      {LoginUsers.map((user) => (
        <div key={user.userId} className={styles["user-container"]}>
          <div onClick={() => handleUserIconClick(user.userId)}>
            <Image src="/images/circle_user.svg" alt="" width={100} height={100} />
          </div>
          {showLogoutConfirmation && selectedUserId === user.userId && (
            <div className={styles["logout-confirmation"]}>
              ログアウトしますか？
              <button onClick={logoutUser} className={styles["confirm-logout-button"]}>
                はい
              </button>
            </div>
          )}
        </div>
      ))}
      {orderCheckModal && (
        <div className={styles["modal"]} onClick={() => setOrderCheckModal(false)}>
          <div className={styles["order-check-modal"]} onClick={(e) => handleModalInsideClick(e)}>
            <p>以下の商品を注文します。よろしいですか？</p>
            <div>
              {cart.map((item) => (
                <div key={item.id} className={styles["cart-item"]}>
                  {menuData
                    .map((menu) => menu.menuProducts)
                    .flat()
                    .filter((menuProduct) => menuProduct.menuProductId === item.id)
                    .map((menuProduct) => (
                      <React.Fragment key={menuProduct.menuProductId}>
                        <div className={styles["cart-item-name"]}>{menuProduct.product.productName}</div>
                        <div className={styles["cart-item-price"]}>{menuProduct.product.price}</div>
                        <div className={styles["cart-item-count"]}>数量: {item.count}</div>
                      </React.Fragment>
                    ))}
                </div>
              ))}
            </div>
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <button onClick={handleOrder}>はい</button>
            <button onClick={() => setOrderCheckModal(false)}>いいえ</button>
          </div>
        </div>
      )}

      {isErrorTableId && (
        <div className={styles.errorModal}>
          <div className={styles.errorModalContent}>
            <p className={styles.errorModalText}>テーブルIDが設定されていません</p>
            <button
              className={styles.errorModalButton}
              onClick={() => {
                void router.push("/order/employee/login").then().catch();
              }}
            >
              テーブルIDを設定する
            </button>
          </div>
        </div>
      )}
    </>
  );
};
