import { Category, Ingredient, Product } from "@prisma/client";
import { FormEvent, useState } from "react";
import styles from "./index.module.css";

export const ProductEdit = ({
  product,
  categories,
  ingredients,
}: {
  product: Product;
  categories: Category[];
  ingredients: Ingredient[];
}) => {
  const [newProduct, setNewProduct] = useState<Product>(product);
  const [openIngredientModal, setOpenIngredientModal] = useState<boolean>(false);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [ingredient, setIngredient] = useState<number[]>([]);

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

  const handleModalOutsideClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      setOpenIngredientModal(false);
      // setOpenAllergyModal(false);
    }
  };

  const handleModalInsideClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const toggleIngredientSelection = (ingredientId: number) => {
    setIngredient((prev) => {
      const newSelection = new Set(prev);

      if (newSelection.has(ingredientId)) {
        newSelection.delete(ingredientId);
      } else {
        newSelection.add(ingredientId);
      }

      const newSelectedIngredients = ingredients
        .filter((ingredient) => newSelection.has(ingredient.ingredientId))
        .map((ingredient) => ingredient.ingredientName);

      setSelectedIngredients(newSelectedIngredients);
      return Array.from(newSelection);
    });
  };

  const clearSelectedItems = (key: "allergy" | "ingredient") => {
    switch (key) {
      // case "allergy":
      //   setAllergy([]);
      //   setSelectedAllergies([]);
      //   break;
      case "ingredient":
        setIngredient([]);
        setSelectedIngredients([]);
        break;
    }
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

          <div className={styles["form-group"]}>
            <label htmlFor="ingredient" className={styles["form-label"]}>
              食材
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenIngredientModal(true);
                }}
                className={styles["form-button"]}
              >
                食材を選択
              </button>
              <div>選択された食材: {selectedIngredients.join(", ")}</div>
            </label>
            {openIngredientModal && (
              <div className={styles["modal"]} onClick={handleModalOutsideClick}>
                <div className={styles["modal-content"]} onClick={handleModalInsideClick}>
                  {ingredients.map((item) => (
                    <button
                      type="button"
                      key={item.ingredientId}
                      onClick={() => toggleIngredientSelection(item.ingredientId)}
                      className={
                        ingredient.includes(item.ingredientId) ? styles["modal-button-active"] : styles["modal-button"]
                      }
                    >
                      {item.ingredientName}
                    </button>
                  ))}
                </div>
                <div className={styles["preview-selected-item"]}>
                  <div className={styles["preview-selected-item-title"]}>選択された食材</div>
                  <button
                    type="button"
                    className={styles["clear-selected-item"]}
                    onClick={() => clearSelectedItems("ingredient")}
                  >
                    すべて解除する
                  </button>
                  <div className={styles["preview-selected-item-content"]}>
                    {selectedIngredients.length > 0 ? selectedIngredients.join(", ") : "なし"}
                  </div>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  );
};
