/*
  Warnings:

  - Added the required column `year` to the `Oligarch` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Oligarch" ADD COLUMN     "year" TEXT NOT NULL;
