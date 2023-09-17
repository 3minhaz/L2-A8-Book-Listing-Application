-- CreateEnum
CREATE TYPE "Status" AS ENUM ('pending');

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'pending';
