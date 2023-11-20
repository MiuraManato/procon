import React, { ChangeEvent, FormEvent, useState } from "react";
import { storage } from "@/utils/Firebase/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Allergy, Category, Ingredient } from "@prisma/client";
import styles from "./index.module.css";
import { useRouter } from "next/router";

export const AddProduct = ({
  allergies,
  ingredients,
  categories,
}: {
  allergies: Allergy[];
  ingredients: Ingredient[];
  categories: Category[];
}) => {
  const [productName, setProductName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [ingredient, setIngredient] = useState<number[]>([]);
  const [allergy, setAllergy] = useState<number[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");

  const [openIngredientModal, setOpenIngredientModal] = useState<boolean>(false);
  const [openAllergyModal, setOpenAllergyModal] = useState<boolean>(false);

  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [touched, setTouched] = useState({
    productName: false,
    price: false,
    description: false,
  });

  const router = useRouter();

  const handleSetProductName = (value: string) => {
    setProductName(value);
  };

  const handleSetPrice = (value: string) => {
    const newPrice = parseInt(value);
    if (!isNaN(newPrice) && newPrice >= 0) {
      setPrice(newPrice);
    }
  };

  const handleSetDescription = (value: string) => {
    setDescription(value);
  };

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
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

  const handleModalOutsideClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      setOpenIngredientModal(false);
      setOpenAllergyModal(false);
    }
  };

  const handleModalInsideClick = (event: React.MouseEvent) => {
    event.stopPropagation();
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) {
      alert("画像ファイルを選択してください。");
      return;
    }

    const storageRef = ref(storage, `images/${file.name}`);

    try {
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      const productData = {
        productName,
        price,
        category,
        description,
        ingredients: ingredient,
        allergies: allergy,
        imageUrl: downloadURL,
      };

      const res = await fetch("/api/product/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (res.ok) {
        console.log("DBへの登録に成功");
        alert("商品の登録に成功しました。");
        await router.push("/employee/menu/add");
      } else {
        const errorText = await res.text();
        throw new Error(`DBへの登録中にエラーが発生しました: ${errorText}`);
      }
    } catch (error) {
      console.error("Upload failed", error);
      alert("DBへの登録に失敗しました。");
    }
  };

  return (
    <>
      <div className={styles.container}>
        <h1>商品登録</h1>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={handleSubmit} className={styles["form-label"]}>
          <div className={styles["form-group"]}>
            <label htmlFor="productName" className={styles["form-label"]}>
              料理名
              <input
                id="productName"
                type="text"
                placeholder="料理名を入力"
                onBlur={() => handleBlur("productName")}
                onChange={(e) => handleSetProductName(e.target.value)}
                className={styles["form-input"]}
              />
              {touched.productName && !productName && <span className={styles["error"]}>料理名を入力してください</span>}
            </label>
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="price" className={styles["form-label"]}>
              価格
              <input
                id="price"
                type="number"
                placeholder="価格を入力"
                onBlur={() => handleBlur("price")}
                onChange={(e) => handleSetPrice(e.target.value)}
                className={styles["form-input"]}
              />
              {touched.price && !price && <span className={styles["error"]}>価格を入力してください</span>}
            </label>
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="description" className={styles["form-label"]}>
              料理説明
              <textarea
                id="description"
                placeholder="説明を入力"
                onBlur={() => handleBlur("description")}
                onChange={(e) => handleSetDescription(e.target.value)}
                className={styles["form-textarea"]}
              />
              {touched.description && !description && <span className={styles["error"]}>説明を入力してください</span>}
            </label>
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="category" className={styles["form-label"]}>
              カテゴリー
              <select
                id="category"
                onChange={(e) => setCategory(parseInt(e.target.value))}
                className={styles["form-select"]}
              >
                <option value={0}>カテゴリーを選択</option>
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
              画像
              <input type="file" onChange={handleFileChange} className={styles["form-input"]} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {imagePreviewUrl && <img src={imagePreviewUrl} alt="Preview" className={styles["image-preview"]} />}
            </label>
          </div>

          <div className={styles["form-group"]}>
            <button
              type="submit"
              className={styles["submit-button"]}
              disabled={productName === "" || description === ""}
            >
              追加
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
