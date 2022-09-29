/*
  Warnings:

  - The values [Sedentary,Lightly_Active,Active,Very_Active,Extremely_Active] on the enum `ActivityLevel` will be removed. If these variants are still used in the database, this will fail.
  - The values [Male,Female] on the enum `Gender` will be removed. If these variants are still used in the database, this will fail.
  - The values [Fat_Loss,Maintenance,Mass_Gain] on the enum `Objective` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `trainingExperience` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TrainingExperience" AS ENUM ('begginer', 'intermediate', 'advanced', 'athlete');

-- AlterEnum
BEGIN;
CREATE TYPE "ActivityLevel_new" AS ENUM ('sedentary', 'lightly_active', 'active', 'very_active', 'extremely_active');
ALTER TABLE "Users" ALTER COLUMN "activityLevel" TYPE "ActivityLevel_new" USING ("activityLevel"::text::"ActivityLevel_new");
ALTER TYPE "ActivityLevel" RENAME TO "ActivityLevel_old";
ALTER TYPE "ActivityLevel_new" RENAME TO "ActivityLevel";
DROP TYPE "ActivityLevel_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Gender_new" AS ENUM ('male', 'female');
ALTER TABLE "Users" ALTER COLUMN "gender" TYPE "Gender_new" USING ("gender"::text::"Gender_new");
ALTER TYPE "Gender" RENAME TO "Gender_old";
ALTER TYPE "Gender_new" RENAME TO "Gender";
DROP TYPE "Gender_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Objective_new" AS ENUM ('fat_loss', 'maintenance', 'mass_gain');
ALTER TABLE "Users" ALTER COLUMN "objective" TYPE "Objective_new" USING ("objective"::text::"Objective_new");
ALTER TYPE "Objective" RENAME TO "Objective_old";
ALTER TYPE "Objective_new" RENAME TO "Objective";
DROP TYPE "Objective_old";
COMMIT;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "bodyFat" INTEGER,
ADD COLUMN     "trainingExperience" "TrainingExperience" NOT NULL;

-- CreateTable
CREATE TABLE "Foods" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "protein" INTEGER NOT NULL,
    "carbohydrate" INTEGER NOT NULL,
    "fat" INTEGER NOT NULL,
    "votes" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Foods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Meals" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "foodId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Meals_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Meals" ADD CONSTRAINT "Meals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meals" ADD CONSTRAINT "Meals_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Foods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
