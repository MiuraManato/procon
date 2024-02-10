import { Allergy, Category, Ingredient } from "@prisma/client";
import { Product } from "@/features/Employee/Product/EditProduct/type";
import Head from "next/head";
import styles from "./index.module.css";
import { ProductEdit } from "@/features/Employee/Product/Edit";
import { useEffect, useState } from "react";

export const EditProduct = ({
  allergies,
  ingredients,
  categories,
  products,
}: {
  allergies: Allergy[];
  ingredients: Ingredient[];
  categories: Category[];
  products: Product[];
}) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  useEffect(() => {
    setSelectedProduct(products[0]);
  }, [products]);

  if (selectedProduct === null) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>商品編集 | PersonalizedMenu</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.contents}>
          <div className={styles["product-list-container"]}>
            <div className={styles["product-list-header"]}>
              <h2>すべての商品一覧</h2>

              {products.map((product) => (
                <div
                  className={styles["product-name"]}
                  key={product.productId}
                  onClick={() => handleProductClick(product)}
                >
                  {product.productName}
                </div>
              ))}
            </div>
          </div>
          <ProductEdit
            allergies={allergies}
            ingredients={ingredients}
            categories={categories}
            product={selectedProduct}
          />
        </div>
      </div>
    </>
  );
};
