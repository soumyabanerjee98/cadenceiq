import { prisma } from '@/lib/prisma.js';

export const createWeeklyGoal = async (
  userId: string,
  input: {
    currentLoad: number;
    targetLoad: number;
    fatigue: number;
    adjustedLoad: number;
    plan: Plan[];
    adjustedPlan: boolean;
    startDate?: Date;
  },
) => {
  const {
    currentLoad,
    targetLoad,
    fatigue,
    adjustedLoad,
    plan,
    adjustedPlan,
    startDate,
  } = input;

  const weekStart = startDate ? new Date(startDate) : new Date();

  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  const existing = await prisma.goal.findFirst({
    where: {
      userId,
      weekStart: { lte: weekEnd },
      weekEnd: { gte: weekStart },
    },
  });

  if (existing) {
    throw new Error('Goal already exists for this week!');
  }

  return await prisma.$transaction(async (tx) => {
    // 1. create goal
    const goal = await tx.goal.create({
      data: {
        userId,
        currentLoad,
        targetLoad,
        adjustedLoad,
        fatigue,
        weekStart,
        weekEnd,
      },
    });

    // 2. create plan
    const plans = await tx.plan.createMany({
      data: plan.map((p) => ({
        goalId: goal.id,
        day: p.day,
        type: p.type,
        load: p.load,
        version: adjustedPlan ? 2 : 1,
        isAdjusted: adjustedPlan,
      })),
    });

    // 3. update user's current goal
    const updatedUser = await tx.user.update({
      where: { id: userId },
      data: {
        currentGoalId: goal.id,
      },
    });

    return { goal, plans, updatedUser };
  });
};
