/*
  Warnings:

  - Added the required column `calories` to the `foods` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "foods" ADD COLUMN     "calories" INTEGER NOT NULL,
ALTER COLUMN "protein" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "carbohydrate" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "fat" SET DATA TYPE DOUBLE PRECISION;
