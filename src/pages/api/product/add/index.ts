import { prisma } from "@/utils/Prisma/PrismaClient";
import { NextApiResponse } from "next";
import { NextApiRequestWithAddProduct } from "@/types/api/product/add";

const addProductHandler = async (req: NextApiRequestWithAddProduct, res: NextApiResponse) => {
  const { productName, price, description, category, ingredients, allergies, imageUrl } = req.body;
  if (!productName || !price || !description) {
    return res.status(400).json({ message: "Invalid request" });
  }

  try {
    const product = await prisma.product.create({
      data: {
        productName: productName,
        price: price,
        description: description,
        categoryId: category,
        imageUrl,
      },
    });

    const productIngredients = ingredients.map((ingredient) => {
      return prisma.productIngredient.create({
        data: {
          productId: product.productId,
          ingredientId: ingredient,
        },
      });
    });

    const productAllergies = allergies.map((allergy) => {
      return prisma.productAllergy.create({
        data: {
          productId: product.productId,
          allergyId: allergy,
        },
      });
    });

    await Promise.all([...productIngredients, ...productAllergies]);

    res.status(200).json({ message: "Product created successfully", product, productIngredients, productAllergies });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong. Please try again later." });
  } finally {
    await prisma.$disconnect();
  }
};

export default addProductHandler;
