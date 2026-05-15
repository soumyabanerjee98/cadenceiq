/*
  Warnings:

  - You are about to drop the `WeeklySummary` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "WeeklySummary" DROP CONSTRAINT "WeeklySummary_goalId_fkey";

-- DropTable
DROP TABLE "WeeklySummary";

-- CreateTable
CREATE TABLE "GoalSummary" (
    "id" TEXT NOT NULL,
    "goalId" TEXT NOT NULL,
    "plannedLoad" DOUBLE PRECISION NOT NULL,
    "actualLoad" DOUBLE PRECISION NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "adherenceScore" DOUBLE PRECISION NOT NULL,
    "trend" TEXT NOT NULL,
    "fatigueRisk" TEXT NOT NULL,
    "aiSummary" TEXT,
    "aiPositives" JSONB,
    "aiIssues" JSONB,
    "aiCurrentState" TEXT,
    "aiRecommendations" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GoalSummary_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GoalSummary_goalId_key" ON "GoalSummary"("goalId");

-- AddForeignKey
ALTER TABLE "GoalSummary" ADD CONSTRAINT "GoalSummary_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "Goal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
