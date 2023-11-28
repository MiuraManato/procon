import { EmployeeHeader } from "@/components/Employee/Header";
import { ProductEdit } from "@/features/Employee/Product/Edit";
import { getProduct } from "@/features/Employee/Product/Edit/getProduct";
import { Product } from "@prisma/client";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";

const ProductEditPage = ({ product }: { product: Product }) => {
  return (
    <>
      <EmployeeHeader />
      <ProductEdit product={product} />
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
  console.log(context.params);
  const productId = context.params ? extractProductId(context.params) : null;
  console.log(productId);

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

  return {
    props: {
      product,
    },
  };
};

export default ProductEditPage;
