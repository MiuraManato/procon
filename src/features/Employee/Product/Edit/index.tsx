import { Category, Product } from "@prisma/client";
import { FormEvent, useState } from "react";
import styles from "./index.module.css";

export const ProductEdit = ({ product, categories }: { product: Product; categories: Category[] }) => {
  const [newProduct, setNewProduct] = useState<Product>(product);

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
  }

  function handleSetProductName(value: string): void {
    setNewProduct({ ...newProduct, productName: value });
  }

  function handleSetPrice(value: string): void {
    setNewProduct({ ...newProduct, price: parseInt(value, 10) });
  }

  function handleSetDescription(value: string): void {
    setNewProduct({ ...newProduct, description: value });
  }

  const handleSetCategory = (value: string): void => {
    setNewProduct({ ...newProduct, categoryId: parseInt(value, 10) });
  };

  return (
    <>
      <div className={styles["container"]}>
        <h1>商品編集</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles["form-group"]}>
            <label htmlFor="productName" className={styles["form-label"]}>
              料理名
              <input
                type="text"
                id="productName"
                className={styles["form-input"]}
                placeholder="料理名を入力"
                value={newProduct.productName}
                onChange={(e) => handleSetProductName(e.target.value)}
              />
              {!newProduct.productName && <span className={styles["error"]}>料理名を入力してください</span>}
            </label>
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="price" className={styles["form-label"]}>
              価格
              <input
                id="price"
                type="number"
                placeholder="価格を入力"
                value={newProduct.price}
                onChange={(e) => handleSetPrice(e.target.value)}
                className={`${styles["form-input"]} ${styles["no-spin"]}`}
              />
              {!newProduct.price && <span className={styles["error"]}>価格を入力してください</span>}
            </label>
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="description" className={styles["form-label"]}>
              料理説明
              <textarea
                id="description"
                placeholder="説明を入力"
                value={newProduct.description}
                onChange={(e) => handleSetDescription(e.target.value)}
                className={styles["form-textarea"]}
              />
              {!newProduct.description && <span className={styles["error"]}>説明を入力してください</span>}
            </label>
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="category" className={styles["form-label"]}>
              カテゴリー
              <select
                id="category"
                value={newProduct.categoryId}
                onChange={(e) => handleSetCategory(e.target.value)}
                className={styles["form-select"]}
              >
                {categories.map((category) => (
                  <option key={category.categoryId} value={category.categoryId}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </form>
      </div>
    </>
  );
};
