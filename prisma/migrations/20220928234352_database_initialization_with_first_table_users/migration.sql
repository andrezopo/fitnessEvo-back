-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female');

-- CreateEnum
CREATE TYPE "ActivityLevel" AS ENUM ('Sedentary', 'Lightly_Active', 'Active', 'Very_Active', 'Extremely_Active');

-- CreateEnum
CREATE TYPE "Objective" AS ENUM ('Fat_Loss', 'Maintenance', 'Mass_Gain');

-- CreateTable
CREATE TABLE "Users" (
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

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
