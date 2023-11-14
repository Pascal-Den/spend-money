/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Oligarch` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Oligarch` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Oligarch" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- CreateTable
CREATE TABLE "Good" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "image" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Good_pkey" PRIMARY KEY ("id")
);
