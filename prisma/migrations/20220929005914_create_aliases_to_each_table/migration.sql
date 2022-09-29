/*
  Warnings:

  - You are about to drop the `Foods` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Meals` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Meals" DROP CONSTRAINT "Meals_foodId_fkey";

-- DropForeignKey
ALTER TABLE "Meals" DROP CONSTRAINT "Meals_userId_fkey";

-- DropTable
DROP TABLE "Foods";

-- DropTable
DROP TABLE "Meals";

-- DropTable
DROP TABLE "Users";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" "Gender" NOT NULL,
    "weight" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "activityLevel" "ActivityLevel" NOT NULL,
    "objective" "Objective" NOT NULL,
    "bodyFat" INTEGER,
    "trainingExperience" "TrainingExperience" NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "foods" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "protein" INTEGER NOT NULL,
    "carbohydrate" INTEGER NOT NULL,
    "fat" INTEGER NOT NULL,
    "votes" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "foods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meals" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "foodId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "meals_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "meals" ADD CONSTRAINT "meals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meals" ADD CONSTRAINT "meals_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "foods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
