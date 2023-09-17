/*
  Warnings:

  - You are about to drop the column `category` on the `Book` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_category_fkey";

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "category",
ADD COLUMN     "categoryId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
