/*
  Warnings:

  - The values [begginer] on the enum `TrainingExperience` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TrainingExperience_new" AS ENUM ('beginner', 'intermediate', 'advanced', 'athlete');
ALTER TABLE "userInfos" ALTER COLUMN "trainingExperience" TYPE "TrainingExperience_new" USING ("trainingExperience"::text::"TrainingExperience_new");
ALTER TYPE "TrainingExperience" RENAME TO "TrainingExperience_old";
ALTER TYPE "TrainingExperience_new" RENAME TO "TrainingExperience";
DROP TYPE "TrainingExperience_old";
COMMIT;
