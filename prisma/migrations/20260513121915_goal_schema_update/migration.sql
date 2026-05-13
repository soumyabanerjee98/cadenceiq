/*
  Warnings:

  - A unique constraint covering the columns `[currentGoalId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Goal_userId_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "currentGoalId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_currentGoalId_key" ON "User"("currentGoalId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_currentGoalId_fkey" FOREIGN KEY ("currentGoalId") REFERENCES "Goal"("id") ON DELETE SET NULL ON UPDATE CASCADE;
