import { getAllergies } from "@/features/Employee/Product/Add/getAllergies";
import { getIngredients } from "@/features/Employee/Product/Add/getIngredients";
import { getCategory } from "@/features/Employee/Product/Add/getCategory";
import { getProduct } from "@/features/Employee/Product/EditProduct/getProducts";
import { Allergy, Category, Ingredient } from "@prisma/client";
import { EmployeeHeader } from "@/components/Employee/Header";
import { Product } from "@/features/Employee/Product/EditProduct/type";
import { EditProduct } from "@/features/Employee/Product/EditProduct";

const EditProductPage = ({
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
  return (
    <>
      <EmployeeHeader />
      <EditProduct allergies={allergies} ingredients={ingredients} categories={categories} products={products} />
    </>
  );
};

export const getServerSideProps = async () => {
  const allergies = await getAllergies();
  const ingredients = await getIngredients();
  const categories = await getCategory();
  const products = await getProduct();

  return {
    props: {
      allergies,
      ingredients,
      categories,
      products,
    },
  };
};

export default EditProductPage;
