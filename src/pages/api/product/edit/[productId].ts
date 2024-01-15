import { NextApiResponse } from "next";
import { NextApiRequestWithEditProduct } from "@/types/api/product/edit";
import { prisma } from "@/utils/Prisma/PrismaClient";

const editProductHandler = async (req: NextApiRequestWithEditProduct, res: NextApiResponse) => {
  const { productId } = req.query;
  const {
    productName,
    price,
    description,
    category,
    addedIngredients,
    removedIngredients,
    addedAllergies,
    removedAllergies,
    imageUrl,
  } = req.body;

  if (!productName || !price || !description || !category) {
    return res.status(400).json({ message: "Invalid request" });
  }

  try {
    // 商品情報の更新
    const updatedProduct = await prisma.product.update({
      where: { productId: Number(productId) },
      data: {
        productName,
        price,
        description,
        categoryId: category,
        imageUrl,
      },
    });

    // 食材の更新
    if (addedIngredients.length > 0 || removedIngredients.length > 0) {
      await Promise.all([
        ...addedIngredients.map((ingredientId) =>
          prisma.productIngredient.create({ data: { productId: updatedProduct.productId, ingredientId } }),
        ),
        ...removedIngredients.map((ingredientId) =>
          prisma.productIngredient.deleteMany({ where: { productId: updatedProduct.productId, ingredientId } }),
        ),
      ]);
    }

    // アレルギー情報の更新
    if (addedAllergies.length > 0 || removedAllergies.length > 0) {
      await Promise.all([
        ...addedAllergies.map((allergyId) =>
          prisma.productAllergy.create({ data: { productId: updatedProduct.productId, allergyId } }),
        ),
        ...removedAllergies.map((allergyId) =>
          prisma.productAllergy.deleteMany({ where: { productId: updatedProduct.productId, allergyId } }),
        ),
      ]);
    }

    res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    console.error("Error updating product", error);
    res.status(500).json({ message: "Something went wrong. Please try again later." });
  }
};

export default editProductHandler;
