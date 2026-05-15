/*
  Warnings:

  - You are about to drop the column `atl` on the `Goal` table. All the data in the column will be lost.
  - You are about to drop the column `ctl` on the `Goal` table. All the data in the column will be lost.
  - You are about to drop the column `tsb` on the `Goal` table. All the data in the column will be lost.
  - You are about to drop the column `weekEnd` on the `Goal` table. All the data in the column will be lost.
  - You are about to drop the column `weekStart` on the `Goal` table. All the data in the column will be lost.
  - You are about to drop the column `day` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `isAdjusted` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `load` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `version` on the `Plan` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,startDate,endDate]` on the table `Goal` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[goalId,date]` on the table `Plan` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `endDate` to the `Goal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `experienceLevel` to the `Goal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fitness` to the `Goal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `readiness` to the `Goal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Goal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetLoad` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Plan` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Goal_userId_weekStart_key";

-- DropIndex
DROP INDEX "Goal_weekStart_idx";

-- DropIndex
DROP INDEX "Plan_goalId_day_version_key";

-- AlterTable
ALTER TABLE "Goal" DROP COLUMN "atl",
DROP COLUMN "ctl",
DROP COLUMN "tsb",
DROP COLUMN "weekEnd",
DROP COLUMN "weekStart",
ADD COLUMN     "customGoalRequest" TEXT,
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "experienceLevel" TEXT NOT NULL,
ADD COLUMN     "fitness" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "readiness" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Plan" DROP COLUMN "day",
DROP COLUMN "isAdjusted",
DROP COLUMN "load",
DROP COLUMN "version",
ADD COLUMN     "actualLoad" DOUBLE PRECISION,
ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "completedAt" TIMESTAMP(3),
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "instructions" TEXT,
ADD COLUMN     "targetDistance" DOUBLE PRECISION,
ADD COLUMN     "targetDuration" INTEGER,
ADD COLUMN     "targetLoad" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Goal_startDate_idx" ON "Goal"("startDate");

-- CreateIndex
CREATE INDEX "Goal_endDate_idx" ON "Goal"("endDate");

-- CreateIndex
CREATE INDEX "Goal_isActive_idx" ON "Goal"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "Goal_userId_startDate_endDate_key" ON "Goal"("userId", "startDate", "endDate");

-- CreateIndex
CREATE INDEX "Plan_date_idx" ON "Plan"("date");

-- CreateIndex
CREATE INDEX "Plan_type_idx" ON "Plan"("type");

-- CreateIndex
CREATE UNIQUE INDEX "Plan_goalId_date_key" ON "Plan"("goalId", "date");
