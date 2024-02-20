-- CreateEnum
CREATE TYPE "ORDERSTATUS" AS ENUM ('COOKING', 'COOKED', 'SERVED');

-- CreateEnum
CREATE TYPE "TYPE" AS ENUM ('LIKE', 'DISLIKE');

-- CreateEnum
CREATE TYPE "TABLESTATUS" AS ENUM ('EMPTY', 'USING');

-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "authority" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Allergy" (
    "allergyId" SERIAL NOT NULL,
    "allergyName" TEXT NOT NULL,

    CONSTRAINT "Allergy_pkey" PRIMARY KEY ("allergyId")
);

-- CreateTable
CREATE TABLE "Product" (
    "productId" SERIAL NOT NULL,
    "productName" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "isSoldOut" BOOLEAN NOT NULL DEFAULT false,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Product_pkey" PRIMARY KEY ("productId")
);

-- CreateTable
CREATE TABLE "Category" (
    "categoryId" SERIAL NOT NULL,
    "categoryName" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("categoryId")
);

-- CreateTable
CREATE TABLE "Ingredient" (
    "ingredientId" SERIAL NOT NULL,
    "ingredientName" TEXT NOT NULL,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("ingredientId")
);

-- CreateTable
CREATE TABLE "Store" (
    "storeId" SERIAL NOT NULL,
    "storeName" TEXT NOT NULL,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("storeId")
);

-- CreateTable
CREATE TABLE "UserPreference" (
    "userPreferenceId" SERIAL NOT NULL,
    "ingredientType" "TYPE" NOT NULL,
    "ingredientId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserPreference_pkey" PRIMARY KEY ("userPreferenceId")
);

-- CreateTable
CREATE TABLE "StoreTable" (
    "tableId" SERIAL NOT NULL,
    "storeId" INTEGER NOT NULL,
    "tableName" TEXT NOT NULL,

    CONSTRAINT "StoreTable_pkey" PRIMARY KEY ("tableId")
);

-- CreateTable
CREATE TABLE "UserAllergy" (
    "userAllergyId" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "allergyId" INTEGER NOT NULL,

    CONSTRAINT "UserAllergy_pkey" PRIMARY KEY ("userAllergyId")
);

-- CreateTable
CREATE TABLE "ProductAllergy" (
    "productAllergyId" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "allergyId" INTEGER NOT NULL,

    CONSTRAINT "ProductAllergy_pkey" PRIMARY KEY ("productAllergyId")
);

-- CreateTable
CREATE TABLE "ProductIngredient" (
    "productIngredientId" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "ingredientId" INTEGER NOT NULL,

    CONSTRAINT "ProductIngredient_pkey" PRIMARY KEY ("productIngredientId")
);

-- CreateTable
CREATE TABLE "MenuProduct" (
    "menuProductId" SERIAL NOT NULL,
    "menuId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "pages" INTEGER NOT NULL,
    "displayOrder" INTEGER NOT NULL,

    CONSTRAINT "MenuProduct_pkey" PRIMARY KEY ("menuProductId")
);

-- CreateTable
CREATE TABLE "Menu" (
    "menuId" SERIAL NOT NULL,
    "menuCategoryName" TEXT NOT NULL,
    "displayOrder" INTEGER NOT NULL,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("menuId")
);

-- CreateTable
CREATE TABLE "Order" (
    "orderId" SERIAL NOT NULL,
    "orderedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tableId" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("orderId")
);

-- CreateTable
CREATE TABLE "OrderDetail" (
    "orderDetailId" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "orderStatus" "ORDERSTATUS" NOT NULL DEFAULT 'COOKING',

    CONSTRAINT "OrderDetail_pkey" PRIMARY KEY ("orderDetailId")
);

-- CreateTable
CREATE TABLE "OrderUser" (
    "orderUserId" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "OrderUser_pkey" PRIMARY KEY ("orderUserId")
);

-- CreateTable
CREATE TABLE "StoreTableStatus" (
    "storeTableStatusId" SERIAL NOT NULL,
    "tableId" INTEGER NOT NULL,
    "status" "TABLESTATUS" NOT NULL DEFAULT 'EMPTY',
    "numberOfPeople" INTEGER NOT NULL,
    "calling" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "StoreTableStatus_pkey" PRIMARY KEY ("storeTableStatusId")
);

-- CreateTable
CREATE TABLE "OrderHistoryLog" (
    "orderHistoryLogId" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "orderedAt" TIMESTAMP(3) NOT NULL,
    "tableId" INTEGER NOT NULL,

    CONSTRAINT "OrderHistoryLog_pkey" PRIMARY KEY ("orderHistoryLogId")
);

-- CreateTable
CREATE TABLE "OrderDetailLog" (
    "orderDetailLogId" SERIAL NOT NULL,
    "orderHistoryLogId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "orderStatus" "ORDERSTATUS" NOT NULL,

    CONSTRAINT "OrderDetailLog_pkey" PRIMARY KEY ("orderDetailLogId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Allergy_allergyName_key" ON "Allergy"("allergyName");

-- CreateIndex
CREATE UNIQUE INDEX "Category_categoryName_key" ON "Category"("categoryName");

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_ingredientName_key" ON "Ingredient"("ingredientName");

-- CreateIndex
CREATE UNIQUE INDEX "Store_storeName_key" ON "Store"("storeName");

-- CreateIndex
CREATE UNIQUE INDEX "Menu_menuCategoryName_key" ON "Menu"("menuCategoryName");

-- CreateIndex
CREATE UNIQUE INDEX "StoreTableStatus_tableId_key" ON "StoreTableStatus"("tableId");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("categoryId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPreference" ADD CONSTRAINT "UserPreference_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("ingredientId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPreference" ADD CONSTRAINT "UserPreference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreTable" ADD CONSTRAINT "StoreTable_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("storeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAllergy" ADD CONSTRAINT "UserAllergy_allergyId_fkey" FOREIGN KEY ("allergyId") REFERENCES "Allergy"("allergyId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAllergy" ADD CONSTRAINT "UserAllergy_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductAllergy" ADD CONSTRAINT "ProductAllergy_allergyId_fkey" FOREIGN KEY ("allergyId") REFERENCES "Allergy"("allergyId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductAllergy" ADD CONSTRAINT "ProductAllergy_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductIngredient" ADD CONSTRAINT "ProductIngredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("ingredientId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductIngredient" ADD CONSTRAINT "ProductIngredient_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuProduct" ADD CONSTRAINT "MenuProduct_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("menuId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuProduct" ADD CONSTRAINT "MenuProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "StoreTable"("tableId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderDetail" ADD CONSTRAINT "OrderDetail_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("orderId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderDetail" ADD CONSTRAINT "OrderDetail_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderUser" ADD CONSTRAINT "OrderUser_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("orderId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderUser" ADD CONSTRAINT "OrderUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreTableStatus" ADD CONSTRAINT "StoreTableStatus_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "StoreTable"("tableId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderDetailLog" ADD CONSTRAINT "OrderDetailLog_orderHistoryLogId_fkey" FOREIGN KEY ("orderHistoryLogId") REFERENCES "OrderHistoryLog"("orderHistoryLogId") ON DELETE RESTRICT ON UPDATE CASCADE;
