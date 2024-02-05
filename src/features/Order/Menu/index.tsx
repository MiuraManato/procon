import { MenuData, tableData } from "@/features/Order/Menu/type";
import styles from "./index.module.css";
import React, { useEffect, useState } from "react";
import { Allergy } from "@prisma/client";
import { QrReader } from "react-qr-reader";
import router from "next/router";
import { exUser } from "./type";
import { Order } from "@/features/Employee/OrderList/type";
import Head from "next/head";

export const CategoryMenu = ({ menuData, allergies }: { menuData: MenuData; allergies: Allergy[] }) => {
  const [LoginUsers, setLoginUsers] = useState<exUser[]>([]);
  const [nowCategoryId, setNowCategoryId] = useState<number | null>(menuData[0].menuId);
  const [nowPage, setNowPage] = useState<number>(1);
  const [isOpenedFilterModal, setIsOpenedFilterModal] = useState<boolean>(false);
  const [allergyFilter, setAllergyFilter] = useState<number[]>([]);
  const [productModal, setProductModal] = useState<number | null>(null);
  const [loginModal, setLoginModal] = useState<boolean>(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState<string>("");
  const [cart, setCart] = useState<{ menuProductId: number; productId: number; count: number }[]>([]);
  const [table, setTable] = useState<number | null>(null);
  const [tableName, setTableName] = useState<string | null>(null);
  const [isConfirmLoginModalOpen, setIsConfirmLoginModalOpen] = useState<boolean>(false);
  const [pendingLoginUser, setPendingLoginUser] = useState<exUser | null>(null);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [orderCheckModal, setOrderCheckModal] = useState<boolean>(false);
  const [isErrorTableId, setIsErrorTableId] = useState(false);
  const [checkAccounting, setCheckAccounting] = useState(false);
  const [isRunningProcess, setIsRunningProcess] = useState<boolean>(false);
  const [isOrdered, setIsOrdered] = useState<boolean>(false);
  const [callingModal, setCallingModal] = useState<boolean>(false);
  const [checkAccountingError, setCheckAccountingError] = useState<boolean>(false);
  const [openOrderHistory, setOpenOrderHistory] = useState<boolean>(false);
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);
  const [nowLoading, setNowLoading] = useState<boolean>(false);
  const [paymentModal, setPaymentModal] = useState<boolean>(false);
  const [sum, setSum] = useState<number>(0);
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [confirmDeleteItemModal, setConfirmDeleteItemModal] = useState<{
    menuProductId: number;
    productId: number;
    count: number;
  } | null>(null);

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

  // ユーザーのアレルギーに基づいてフィルターを更新する関数
  const handleSetUserAllergyFilter = (selectedUser: exUser) => {
    setAllergyFilter(selectedUser.allergies.map((allergy) => allergy.allergyId));
  };

  const handleCallingTable = async () => {
    setCallingModal(true);
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

  const handleSetIsConfirmLoginModalClose = () => {
    setIsConfirmLoginModalOpen(false);
  };

  const handleSetAccountingModaloutsideClick = () => {
    setCheckAccounting(false);
  };

  const handleSetOpenLoginModal = () => {
    setLoginModal(true);
  };

  const handleModalInsideClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const handleCloseCallingModal = () => {
    setCallingModal(false);
  };

  const tryLogin = async (uid: string) => {
    try {
      const res = await fetch(`/api/user/${uid}`);
      if (!res.ok) {
        setLoginErrorMessage("ログインに失敗しました");
        return;
      }
      const data: exUser = (await res.json()) as exUser;
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
    return;
    setShowLogoutConfirmation(true);
    setSelectedUserId(userId);
  };

  const handleCloseModal = () => {
    setCheckAccountingError(false);
  };

  const logoutUser = () => {
    setLoginUsers((prevUsers) => prevUsers.filter((user) => user.userId !== selectedUserId));
    setShowLogoutConfirmation(false);
  };

  // カートに商品を追加する関数
  const addCart = (e: React.MouseEvent, menuProductId: number, productId: number) => {
    e.stopPropagation();
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.menuProductId === menuProductId);
      if (existingItem) {
        // 既存の商品の数量を増やす
        return prevCart.map((item) =>
          item.menuProductId === menuProductId ? { ...item, count: item.count + 1 } : item,
        );
      } else {
        // 新しい商品を追加
        return [...prevCart, { menuProductId: menuProductId, count: 1, productId: productId }];
      }
    });
  };

  const decrementItem = (e: React.MouseEvent, menuProductId: number, productId: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.menuProductId === menuProductId);
      if (existingItem) {
        // 既存の商品の数量を減らす
        if (existingItem.count - 1 === 0) {
          // 商品の数量が0になったら、削除するか確認をする
          setConfirmDeleteItemModal(existingItem);
          return prevCart;
          //その商品をカートから削除
          return prevCart.filter((item) => item.menuProductId !== menuProductId);
        } else {
          // それ以外の場合は、商品の数量を減らす
          return prevCart.map((item) =>
            item.menuProductId === menuProductId ? { ...item, count: item.count - 1 } : item,
          );
        }
      } else {
        // 新しい商品を追加
        return [...prevCart, { menuProductId: menuProductId, productId: productId, count: 1 }];
      }
    });
  };

  const orderCheck = () => {
    setOrderCheckModal(true);
  };

  const convertStatus = (ORDERSTATUS: string) => {
    switch (ORDERSTATUS) {
      case "COOKING":
        return "調理中";
      case "COOKED":
        return "調理中";
      case "SERVED":
        return "提供済み";
      default:
        return "不明";
    }
  };

  const handleSetOpenOrderHistory = async () => {
    setOpenOrderHistory(true);
    await getOrderHistory().then().catch();
  };

  const getOrderHistory = async () => {
    setNowLoading(true);
    const res = await fetch(`/api/order/get/${table}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Get order history failed");
    }
    const data: Order[] = (await res.json()) as Order[];
    setOrderHistory(data);
    setNowLoading(false);
  };

  const handleOrder = async () => {
    if (!isOrdered) setIsOrdered(true);
    setIsOrdering(true);
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
    setIsOrdering(false);
    setOrderPlaced(true);
  };

  const getTableName = async () => {
    const res = await fetch(`/api/table/getTableName/${table}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Get table name failed");
    }
    const data: tableData = (await res.json()) as tableData;
    setTableName(data.table.tableName);
  };

  const handlePay = async () => {
    setIsRunningProcess(true);
    await getOrderHistory().then().catch();
    setSum(
      orderHistory.reduce((acc, cur) => acc + cur.orderDetail.reduce((acc, cur) => acc + cur.product.price, 0), 0),
    );
    await getTableName();
    const res = await fetch(`/api/table/pay/${table}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    if (!res.ok) {
      throw new Error("Pay failed");
    }
    setIsRunningProcess(false);
    setPaymentModal(true);
  };

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
      <Head>
        <title>メニュー一覧 | PersonalizedMenu</title>
      </Head>
      <div className={styles["container"]}>
        <div className={styles["menu-container"]}>
          <div className={styles["menu-header"]}>
            {menuData.map((menu) => (
              <React.Fragment key={menu.menuId}>
                <div key={menu.menuCategoryName} className={styles["category-container"]}>
                  <button
                    className={`${styles["category-button"]}
                ${menu.menuId === nowCategoryId ? styles["category-button-active"] : styles["category-button-notactive"]}`}
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
              {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
              <button className={styles["category-button"]} onClick={handleSetOpenOrderHistory}>
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
                <p
                  className={styles["category-list"]}
                  onClick={() => (isOrdered ? setCheckAccounting(true) : setCheckAccountingError(true))}
                >
                  会計
                </p>
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
                            onClick={() => setProductModal(menuProduct.menuProductId)}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img className={styles.productImage} src={menuProduct.product.imageUrl} alt="product" />
                            <div className={styles.productName}>{menuProduct.product.productName}</div>
                            <div className={styles.productPrice}>{menuProduct.product.price}円</div>
                            <div className={styles.cartButton}>
                              <button
                                className={styles["cart-button"]}
                                onClick={(e) => addCart(e, menuProduct.menuProductId, menuProduct.productId)}
                              >
                                カートに入れる
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  ),
              )}
              <div>
                {menuData.map(
                  (menu) =>
                    nowCategoryId === menu.menuId && (
                      <div key={menu.menuCategoryName} className={styles["pagination-container"]}>
                        <button
                          className={`${styles["page-move-button"]} ${styles["page-move-active"]}`}
                          disabled={nowPage === 1}
                          onClick={() => setNowPage(nowPage - 1)}
                        >
                          <span className={styles["button-text"]}>＜</span>
                        </button>
                        <span className={styles["current-page-info"]}>
                          {nowPage}/{menu.menuProducts[menu.menuProducts.length - 1].pages}
                        </span>
                        <button
                          className={`${styles["page-move-button"]} ${styles["page-move-active"]}`}
                          disabled={nowPage === menu.menuProducts[menu.menuProducts.length - 1].pages}
                          onClick={() => setNowPage(nowPage + 1)}
                        >
                          <span className={styles["button-text"]}>＞</span>
                        </button>
                      </div>
                    ),
                )}
              </div>
            </div>
            <div className={styles["cart-container"]}>
              <p className={styles["cart-title"]}>現在のカート</p>
              <div className={styles["cart-items"]}>
                {cart.map((item) => (
                  <div key={item.menuProductId} className={styles["cart-item"]}>
                    {menuData
                      .map((menu) => menu.menuProducts)
                      .flat()
                      .filter((menuProduct) => menuProduct.menuProductId === item.menuProductId)
                      .map((menuProduct) => (
                        <React.Fragment key={menuProduct.menuProductId}>
                          <div className={styles["cart-item-name"]}>{menuProduct.product.productName}</div>
                          <div className={styles["cart-item-price"]}>{menuProduct.product.price}円</div>
                          {/* <div className={styles["cart-item-count"]}>数量: {item.count}</div>
                          <div>
                            <button
                              className={`${styles["cart-quantity"]} ${styles["margin-right"]}`}
                              onClick={(e) => addCart(e, menuProduct.menuProductId, menuProduct.productId)}
                            >
                              +
                            </button>
                            <button
                              className={`${styles["cart-quantity"]} ${styles["margin-left"]}`}
                              onClick={(e) => decrementItem(e, menuProduct.menuProductId, menuProduct.productId)}
                            >
                              -
                            </button>
                          </div> */}
                          <div className={styles["quantity-selector"]}>
                            <button
                              className={styles["quantity-button"]}
                              onClick={(e) => decrementItem(e, menuProduct.menuProductId, menuProduct.productId)}
                            >
                              -
                            </button>
                            <span className="quantity-number">{item.count}</span>
                            <button
                              className={styles["quantity-button"]}
                              onClick={(e) => addCart(e, menuProduct.menuProductId, menuProduct.productId)}
                            >
                              +
                            </button>
                          </div>
                        </React.Fragment>
                      ))}
                  </div>
                ))}
              </div>
              {cart.length > 0 && (
                <div>
                  <div>
                    合計金額：
                    {cart.reduce(
                      (acc, cur) =>
                        acc +
                        menuData
                          .map((menu) => menu.menuProducts)
                          .flat()
                          .filter((menuProduct) => menuProduct.menuProductId === cur.menuProductId)
                          .map((menuProduct) => menuProduct.product.price)[0] *
                          cur.count,
                      0,
                    )}
                    円
                  </div>
                  <button className={styles["purchase-button"]} onClick={orderCheck}>
                    注文する
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        {confirmDeleteItemModal && (
          <div>
            <div className={styles["modal"]} onClick={() => setConfirmDeleteItemModal(null)}>
              <div className={styles["confirm-delete-item-modal"]} onClick={(e) => handleModalInsideClick(e)}>
                <p>商品をカートから削除しますか？</p>
                <div>
                  <button
                    className={styles["confirm-delete-item-button"]}
                    onClick={() => setConfirmDeleteItemModal(null)}
                  >
                    キャンセル
                  </button>
                  <button
                    className={styles["confirm-delete-item-button"]}
                    onClick={() => {
                      setCart((prevCart) =>
                        prevCart.filter(
                          (item) =>
                            item.menuProductId !== confirmDeleteItemModal.menuProductId ||
                            item.productId !== confirmDeleteItemModal.productId,
                        ),
                      );
                      setConfirmDeleteItemModal(null);
                    }}
                  >
                    削除する
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
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
                  <div className={styles["filter-modal-product-name"]}>{allergy.allergyName}</div>
                </button>
              ))}
              {/* ユーザー選択用のUIをフィルターモーダルに追加 */}
              {LoginUsers.length > 0 && (
                <div className={styles["filter-modal-user-title"]}>
                  ユーザーのアレルギーを適用するには、ユーザー名をタップしてください。
                </div>
              )}
              {LoginUsers.map((user) => (
                <button
                  key={user.userId}
                  onClick={() => handleSetUserAllergyFilter(user)}
                  className={styles["user-button"]}
                >
                  {user.username}
                </button>
              ))}
            </div>
          </div>
        )}

        {openOrderHistory && (
          <div>
            <div className={styles["modal"]} onClick={() => setOpenOrderHistory(false)}>
              <div className={styles["order-history-modal"]} onClick={(e) => handleModalInsideClick(e)}>
                <p className={styles["order-history-title"]}>注文履歴</p>
                <div className={styles["order-history-content"]}>
                  {nowLoading ? (
                    <p className={styles["order-history-loading"]}>読み込み中...</p>
                  ) : (
                    <>
                      {orderHistory.map((order) => (
                        <div key={order.orderId} className={styles["order-history-item"]}>
                          {order.orderDetail.map((orderDetail) => (
                            <React.Fragment key={orderDetail.orderDetailId}>
                              <div className={styles["order-history-item-div"]}>
                                <div className={styles["order-history-item-name"]}>
                                  {orderDetail.product.productName}
                                </div>
                                <div className={styles["order-history-item-price"]}>{orderDetail.product.price}円</div>
                                <div className={styles["order-history-item-count"]}>数量：{orderDetail.quantity}</div>
                                <div>{convertStatus(orderDetail.orderStatus)}</div>
                              </div>
                            </React.Fragment>
                          ))}
                          <div className={styles["order-history-item-sum"]}>
                            1注文の合計金額：{order.orderDetail.reduce((acc, cur) => acc + cur.product.price, 0)}円
                          </div>
                        </div>
                      ))}
                      <div className={styles["flex"]}>
                        <div className={styles["order-history-item-sum-all"]}>
                          合計金額：
                          {orderHistory.reduce(
                            (acc, cur) => acc + cur.orderDetail.reduce((acc, cur) => acc + cur.product.price, 0),
                            0,
                          )}
                          円
                        </div>
                        <button className={styles["modal-close-button"]} onClick={() => setOpenOrderHistory(false)}>
                          閉じる
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
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
                          {menuProduct.product.productAllergies.length === 0 && <>なし</>}
                          {menuProduct.product.productAllergies.map((allergy) => (
                            <div key={allergy.allergyId} className={styles["product-modal-allergies-item"]}>
                              {allergy.allergy.allergyName}
                            </div>
                          ))}
                        </div>
                        <div className={styles["product-modal-allergies"]}>
                          <div className={styles["product-modal-allergies-pre"]}>使用食材：</div>
                          {menuProduct.product.productIngredients.length === 0 && <>なし</>}
                          {menuProduct.product.productIngredients.map((ingredient) => (
                            <div key={ingredient.ingredientId} className={styles["product-modal-allergies-item"]}>
                              {ingredient.ingredient.ingredientName}
                            </div>
                          ))}
                        </div>
                        <div className={styles.cartButton}>
                          <button
                            className={styles["cart-button"]}
                            onClick={(e) => addCart(e, menuProduct.menuProductId, menuProduct.productId)}
                          >
                            カートに入れる
                          </button>
                        </div>
                      </div>
                      <div className={styles["product-modal-image-container"]}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          className={styles["product-modal-image"]}
                          src={menuProduct.product.imageUrl}
                          alt="product"
                        />
                      </div>
                    </div>
                  </React.Fragment>
                ))}
            </div>
          </div>
        )}
        {loginModal && (
          <div className={styles["modal"]} onClick={handleLoginModalOutsideClick}>
            <div className={styles["login-modal"]} onClick={handleModalInsideClick}>
              <div className={styles["login-modal-content"]}>
                {loginErrorMessage && <div className={styles["login-modal-error"]}>{loginErrorMessage}</div>}

                <div className={styles["div"]}>
                  <div className={styles["login-modal-qr-reader"]}>
                    <div className={styles["login-modal-title"]}>QRコードをかざしてください</div>
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
                      containerStyle={{ width: "100%", height: "100%" }}
                    />
                  </div>
                  <div className={styles["login-user"]}>
                    <div className={styles["login-user-title"]}>[ログイン中のユーザー]</div>
                    {LoginUsers.map((user) => (
                      <div key={user.userId} className={styles["user-container"]}>
                        <div className={styles["username"]} onClick={() => handleUserIconClick(user.userId)}>
                          {user.username}
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {isConfirmLoginModalOpen && (
          <div className={styles["modal"]} onClick={() => handleSetIsConfirmLoginModalClose()}>
            <div className={styles["confirm-login-modal"]} onClick={(e) => handleModalInsideClick(e)}>
              <p>以下のユーザーでログインしますか？</p>
              <p className={styles["confirm-login-user"]}>{pendingLoginUser?.username}</p>
              <button
                className={styles["confirm-login-button-cancel"]}
                onClick={() => setIsConfirmLoginModalOpen(false)}
              >
                キャンセル
              </button>
              <button className={styles["confirm-login-button-accept"]} onClick={confirmLogin}>
                ログイン
              </button>
            </div>
          </div>
        )}

        {callingModal && (
          <div className={styles["outside-modal"]} onClick={handleCloseCallingModal}>
            <div className={`${styles["calling-modal"]}`}>
              <div className={styles["calling-contents"]} onClick={handleModalInsideClick}>
                <p className={styles["calling-text"]}>従業員を呼び出しています。しばらくお待ちください。</p>
                <button className={styles["calling-button"]} onClick={handleCloseCallingModal}>
                  閉じる
                </button>
              </div>
            </div>
          </div>
        )}

        {orderCheckModal && (
          <div className={styles["modal"]} onClick={() => setOrderCheckModal(false)}>
            <div className={styles["order-check-modal"]} onClick={(e) => handleModalInsideClick(e)}>
              <p className={styles["order-title"]}>以下の商品を注文します。よろしいですか？</p>
              <div className={styles["order-check-modal-content"]}>
                {cart.map((item) => (
                  <div key={item.menuProductId} className={styles["cart-item"]}>
                    {menuData
                      .map((menu) => menu.menuProducts)
                      .flat()
                      .filter((menuProduct) => menuProduct.menuProductId === item.menuProductId)
                      .map((menuProduct) => (
                        <React.Fragment key={menuProduct.menuProductId}>
                          <div className={styles["cart-item-name"]}>{menuProduct.product.productName}</div>
                          <div className={styles["cart-item-price"]}>{menuProduct.product.price}円</div>
                          <div className={styles["cart-item-count"]}>数量: {item.count}</div>
                        </React.Fragment>
                      ))}
                  </div>
                ))}
              </div>
              <div className={styles["order-button"]}>
                <button className={styles["order-modal-button"]} onClick={() => setOrderCheckModal(false)}>
                  やめる
                </button>
                {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
                <button className={styles["order-modal-button"]} onClick={handleOrder}>
                  注文する
                </button>
              </div>
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

        {checkAccountingError && (
          <div className={styles["outside-modal"]} onClick={handleCloseModal}>
            <div className={`${styles["calling-modal"]}`}>
              <div className={styles["calling-contents"]} onClick={handleModalInsideClick}>
                <p className={styles["calling-text"]}>注文をしていないため、お会計には進めません。</p>
                <button className={styles["calling-button"]} onClick={handleCloseModal}>
                  閉じる
                </button>
              </div>
            </div>
          </div>
        )}

        {checkAccounting && (
          <div className={styles["outside-modal"]} onClick={handleSetAccountingModaloutsideClick}>
            <div className={`${styles["check-accounting-modal"]}`}>
              <div className={styles["check-accounting-contents"]} onClick={handleModalInsideClick}>
                <p className={styles["check-accounting"]}>お会計に進みます。よろしいですか？</p>
                {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
                <button
                  className={styles["check-accounting-button"]}
                  onClick={() => {
                    setCheckAccounting(false);
                    void handlePay();
                  }}
                >
                  会計に進む
                </button>
                <button
                  className={`${styles["check-accounting-button"]} ${styles["margin-left-40px"]}`}
                  onClick={() => setCheckAccounting(false)}
                >
                  戻る
                </button>
              </div>
            </div>
          </div>
        )}

        {isRunningProcess && (
          <div className={styles.errorModal}>
            <div className={styles.errorModalContent}>
              <p className={styles.errorModalText}>会計処理中です</p>
              <p className={styles.errorModalText}>しばらくお待ちください</p>
            </div>
          </div>
        )}

        {paymentModal && (
          <div className={`${styles["payment-modal"]}`}>
            <div className={styles["payment-contents"]} onClick={handleModalInsideClick}>
              <p className={styles["payment-text"]}>ご利用いただきありがとうございました。</p>
              <p className={styles["payment-text"]}>
                お会計の金額は<span className={styles["tableName"]}> {sum} 円</span>です。
              </p>
              <p className={styles["payment-text"]}>
                レジで<span className={styles["tableName"]}>{tableName}番</span>とお伝えください。
              </p>
              <button className={styles["payment-button"]} onClick={() => void router.push("/order").then().catch()}>
                閉じる
              </button>
            </div>
          </div>
        )}

        {isOrdering && (
          <div className={styles["ordering-modal"]}>
            <div>注文中です...</div>
          </div>
        )}
        {orderPlaced && (
          <div className={styles["order-placed-modal"]}>
            <div className={styles["order-placed-modal-content"]}>
              <p>注文しました。</p>
              <button onClick={() => setOrderPlaced(false)}>OK</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
