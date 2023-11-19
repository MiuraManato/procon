import { AddProduct } from "@/features/Employee/Product/Add";
import { getAllergies } from "@/features/Employee/Product/Add/getAllergies";
import { getIngredients } from "@/features/Employee/Product/Add/getIngredients";
import { Allergy, Ingredient } from "@prisma/client";

const AddProductPage = ({ allergies, ingredients }: { allergies: Allergy[]; ingredients: Ingredient[] }) => {
  return <AddProduct allergies={allergies} ingredients={ingredients} />;
};

export const getServerSideProps = async () => {
  const allergies = await getAllergies();
  const ingredients = await getIngredients();

  return {
    props: {
      allergies,
      ingredients,
    },
  };
};

export default AddProductPage;
