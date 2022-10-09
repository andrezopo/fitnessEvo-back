/*
  Warnings:

  - You are about to drop the `userInfos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "meals" DROP CONSTRAINT "meals_userId_fkey";

-- DropForeignKey
ALTER TABLE "userInfos" DROP CONSTRAINT "userInfos_userId_fkey";

-- DropTable
DROP TABLE "userInfos";

-- CreateTable
CREATE TABLE "user_infos" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "sex" "Sex" NOT NULL,
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

    CONSTRAINT "user_infos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_votes" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "foodId" INTEGER NOT NULL,

    CONSTRAINT "users_votes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_infos_userId_key" ON "user_infos"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "users_votes_userId_foodId_key" ON "users_votes"("userId", "foodId");

-- AddForeignKey
ALTER TABLE "user_infos" ADD CONSTRAINT "user_infos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meals" ADD CONSTRAINT "meals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_infos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_votes" ADD CONSTRAINT "users_votes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_infos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_votes" ADD CONSTRAINT "users_votes_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "foods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
