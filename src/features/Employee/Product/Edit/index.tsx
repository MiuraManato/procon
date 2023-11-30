import { Allergy, Category, Ingredient } from "@prisma/client";
import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./index.module.css";
import { ProductType } from "./type";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/utils/Firebase/firebaseConfig";

export const ProductEdit = ({
  product,
  categories,
  ingredients,
  allergies,
}: {
  product: ProductType;
  categories: Category[];
  ingredients: Ingredient[];
  allergies: Allergy[];
}) => {
  const [newProduct, setNewProduct] = useState<ProductType>(product);
  const [openIngredientModal, setOpenIngredientModal] = useState<boolean>(false);
  const [openAllergyModal, setOpenAllergyModal] = useState<boolean>(false);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>(
    product.productIngredients.map((item) => item.ingredient.ingredientName),
  );
  const [ingredient, setIngredient] = useState<number[]>(product.productIngredients.map((item) => item.ingredientId));
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>(
    product.productAllergies.map((item) => item.allergy.allergyName),
  );
  const [allergy, setAllergy] = useState<number[]>(product.productAllergies.map((item) => item.allergyId));
  const [file, setFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>(newProduct.imageUrl);

  const uploadImageAndGetURL = async (file: File): Promise<string> => {
    const storageRef = ref(storage, `images/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    return getDownloadURL(snapshot.ref);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    try {
      const downloadURL = file ? await uploadImageAndGetURL(file) : imagePreviewUrl;

      const productData = {
        productName: newProduct.productName,
        price: newProduct.price,
        category: newProduct.categoryId,
        description: newProduct.description,
        ingredients: ingredient,
        allergies: allergy,
        imageUrl: downloadURL,
      };

      const res = await fetch(`/api/product/edit/${product.productId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (res.ok) {
        console.log("DBの更新に成功");
        alert("商品の更新に成功しました。");
      } else {
        const errorText = await res.text();
        throw new Error(`DBの更新中にエラーが発生しました: ${errorText}`);
      }
    } catch (error) {
      console.error("Upload failed", error);
      alert("DBへの登録に失敗しました。");
    }
  };

  const handleSetProductName = (value: string): void => {
    setNewProduct({ ...newProduct, productName: value });
  };

  const handleSetPrice = (value: string): void => {
    setNewProduct({ ...newProduct, price: parseInt(value, 10) });
  };

  const handleSetDescription = (value: string): void => {
    setNewProduct({ ...newProduct, description: value });
  };

  const handleSetCategory = (value: string): void => {
    setNewProduct({ ...newProduct, categoryId: parseInt(value, 10) });
  };

  const handleModalOutsideClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      setOpenIngredientModal(false);
      setOpenAllergyModal(false);
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

  const toggleAllergySelection = (allergyId: number) => {
    setAllergy((prev) => {
      const newSelection = new Set(prev);

      if (newSelection.has(allergyId)) {
        newSelection.delete(allergyId);
      } else {
        newSelection.add(allergyId);
      }

      const newSelectedAllergies = allergies
        .filter((allergy) => newSelection.has(allergy.allergyId))
        .map((allergy) => allergy.allergyName);

      setSelectedAllergies(newSelectedAllergies);
      return Array.from(newSelection);
    });
  };

  const clearSelectedItems = (key: "allergy" | "ingredient") => {
    switch (key) {
      case "allergy":
        setAllergy([]);
        setSelectedAllergies([]);
        break;
      case "ingredient":
        setIngredient([]);
        setSelectedIngredients([]);
        break;
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      if (!selectedFile.type.startsWith("image/")) {
        alert("画像ファイルを選択してください。");
        return;
      }

      setFile(selectedFile);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <>
      <div className={styles["container"]}>
        <h1>商品編集</h1>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
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

          <div className={styles["form-group"]}>
            <label htmlFor="allergy" className={styles["form-label"]}>
              アレルギー
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenAllergyModal(true);
                }}
                className={styles["form-button"]}
              >
                アレルギーを選択
              </button>
              <div>選択された食材: {selectedAllergies.join(", ")}</div>
            </label>
            {openAllergyModal && (
              <>
                <div className={styles["modal"]} onClick={handleModalOutsideClick}>
                  <div className={styles["modal-content"]} onClick={handleModalInsideClick}>
                    {allergies.map((all) => (
                      <button
                        type="button"
                        key={all.allergyId}
                        onClick={() => toggleAllergySelection(all.allergyId)}
                        className={
                          allergy.includes(all.allergyId) ? styles["modal-button-active"] : styles["modal-button"]
                        }
                      >
                        {all.allergyName}
                      </button>
                    ))}
                  </div>
                  <div className={styles["preview-selected-item"]}>
                    <div className={styles["preview-selected-item-title"]}>選択されたアレルギー</div>
                    <button
                      type="button"
                      className={styles["clear-selected-item"]}
                      onClick={() => clearSelectedItems("allergy")}
                    >
                      すべて解除する
                    </button>
                    <div className={styles["preview-selected-item-content"]}>
                      {selectedAllergies.length > 0 ? selectedAllergies.join(", ") : "なし"}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="image" className={styles["form-label"]}>
              現在の画像
              <label htmlFor="fileInput" className={styles["form-change-file"]}>
                画像を変える
              </label>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imagePreviewUrl} alt="Preview" className={styles["image-preview"]} />
            </label>
            <input
              id="fileInput"
              type="file"
              onChange={handleFileChange}
              className={styles["form-input"]}
              style={{ display: "none" }}
            />
          </div>

          <div className={styles["form-group"]}>
            <button
              type="submit"
              className={styles["submit-button"]}
              disabled={
                newProduct.productName === "" ||
                newProduct.description === "" ||
                newProduct.price === 0 ||
                file === null
              }
            >
              更新
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
