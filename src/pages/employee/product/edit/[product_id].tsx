import { EmployeeHeader } from "@/components/Employee/Header";
import { getCategory } from "@/features/Employee/Product/Add/getCategory";
import { getIngredients } from "@/features/Employee/Product/Add/getIngredients";
import { ProductEdit } from "@/features/Employee/Product/Edit";
import { getProduct } from "@/features/Employee/Product/Edit/getProduct";
import { ProductType } from "@/features/Employee/Product/Edit/type";
import { Category, Ingredient } from "@prisma/client";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";

const ProductEditPage = ({
  product,
  categories,
  ingredients,
}: {
  product: ProductType;
  categories: Category[];
  ingredients: Ingredient[];
}) => {
  return (
    <>
      <EmployeeHeader />
      <ProductEdit product={product} categories={categories} ingredients={ingredients} />
    </>
  );
};

/**
 *
 * @param params productIdを含むクエリパラメータ
 * @returns ProductId or null
 *
 * この関数は、クエリパラメータからproductIdを取り出す。
 * productIdが文字列であれば、数値に変換して返す。
 * productIdが数値でなければ、nullを返す。
 */
const extractProductId = (params: ParsedUrlQuery): number | null => {
  const productId = params.product_id;
  if (typeof productId === "string") {
    const parsedId = parseInt(productId, 10);
    return isNaN(parsedId) ? null : parsedId;
  }
  return null;
};

const fetchProductData = async (productId: number) => {
  try {
    const product = await getProduct(productId);
    return product;
  } catch (error) {
    console.error("Failed to fetch product data:", error);
    return null;
  }
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const productId = context.params ? extractProductId(context.params) : null;

  if (productId === null) {
    return {
      notFound: true,
    };
  }

  const product = await fetchProductData(productId);

  if (!product) {
    return {
      notFound: true,
    };
  }

  const categories = await getCategory();
  const ingredients = await getIngredients();

  return {
    props: {
      product,
      categories,
      ingredients,
    },
  };
};

export default ProductEditPage;
