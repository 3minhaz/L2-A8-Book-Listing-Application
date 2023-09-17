/*
  Warnings:

  - Changed the type of `quantity` on the `orderedBooks` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "BookAndQuantity" AS ENUM ('bookId', 'quantity');

-- AlterTable
ALTER TABLE "orderedBooks" DROP COLUMN "quantity",
ADD COLUMN     "quantity" INTEGER NOT NULL;
