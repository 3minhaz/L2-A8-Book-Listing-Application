-- CreateEnum
CREATE TYPE "OrderBooks" AS ENUM ('bookId', 'quantity');

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderedBooks" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,

    CONSTRAINT "OrderedBooks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrderedBooks" ADD CONSTRAINT "OrderedBooks_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderedBooks" ADD CONSTRAINT "OrderedBooks_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
