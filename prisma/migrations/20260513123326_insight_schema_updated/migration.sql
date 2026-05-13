/*
  Warnings:

  - A unique constraint covering the columns `[userId,date]` on the table `DailyInsight` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "DailyInsight_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "DailyInsight_userId_date_key" ON "DailyInsight"("userId", "date");
