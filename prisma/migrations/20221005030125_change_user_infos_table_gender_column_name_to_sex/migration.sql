/*
  Warnings:

  - You are about to drop the column `gender` on the `userInfos` table. All the data in the column will be lost.
  - Added the required column `sex` to the `userInfos` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('male', 'female');

-- AlterTable
ALTER TABLE "userInfos" DROP COLUMN "gender",
ADD COLUMN     "sex" "Sex" NOT NULL;

-- DropEnum
DROP TYPE "Gender";
