/*
  Warnings:

  - You are about to drop the column `activityLevel` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `age` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `bodyFat` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `height` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `objective` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `trainingExperience` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "meals" DROP CONSTRAINT "meals_userId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "activityLevel",
DROP COLUMN "age",
DROP COLUMN "bodyFat",
DROP COLUMN "gender",
DROP COLUMN "height",
DROP COLUMN "objective",
DROP COLUMN "trainingExperience",
DROP COLUMN "weight";

-- CreateTable
CREATE TABLE "userInfos" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "gender" "Gender" NOT NULL,
    "age" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "activityLevel" "ActivityLevel" NOT NULL,
    "objective" "Objective" NOT NULL,
    "bodyFat" INTEGER,
    "trainingExperience" "TrainingExperience" NOT NULL,
    "calorieGoal" INTEGER,
    "proteinGoal" INTEGER,
    "carbohydrateGoal" INTEGER,
    "fatGoal" INTEGER,

    CONSTRAINT "userInfos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "userInfos_userId_key" ON "userInfos"("userId");

-- AddForeignKey
ALTER TABLE "userInfos" ADD CONSTRAINT "userInfos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meals" ADD CONSTRAINT "meals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "userInfos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
