import { AddProduct } from "@/features/Employee/Product/Add";
import { getAllergies } from "@/features/Employee/Product/Add/getAllergies";
import { getIngredients } from "@/features/Employee/Product/Add/getIngredients";
import { getCategory } from "@/features/Employee/Product/Add/getCategory";
import { Allergy, Category, Ingredient } from "@prisma/client";
import { EmployeeHeader } from "@/components/Employee/Header";

const AddProductPage = ({
  allergies,
  ingredients,
  categories,
}: {
  allergies: Allergy[];
  ingredients: Ingredient[];
  categories: Category[];
}) => {
  return (
    <>
      <EmployeeHeader />
      <AddProduct allergies={allergies} ingredients={ingredients} categories={categories} />
    </>
  );
};

export const getServerSideProps = async () => {
  const allergies = await getAllergies();
  const ingredients = await getIngredients();
  const categories = await getCategory();

  return {
    props: {
      allergies,
      ingredients,
      categories,
    },
  };
};

export default AddProductPage;
