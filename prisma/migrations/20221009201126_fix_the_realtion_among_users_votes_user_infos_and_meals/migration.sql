-- DropForeignKey
ALTER TABLE "meals" DROP CONSTRAINT "meals_userId_fkey";

-- DropForeignKey
ALTER TABLE "users_votes" DROP CONSTRAINT "users_votes_userId_fkey";

-- AddForeignKey
ALTER TABLE "meals" ADD CONSTRAINT "meals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_infos"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_votes" ADD CONSTRAINT "users_votes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_infos"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
