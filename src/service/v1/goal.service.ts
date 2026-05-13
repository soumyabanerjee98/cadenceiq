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
  },
) => {
  const { currentLoad, targetLoad, fatigue, adjustedLoad, plan, adjustedPlan } =
    input;
  const weekStart = new Date();
  const weekEnd = new Date();
  weekEnd.setDate(weekStart.getDate() + 7);
  // create goal
  const goal = await prisma.goal.create({
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
  // create plan entries
  const plans = await prisma.plan.createMany({
    data: plan.map((p) => ({
      goalId: goal.id,
      day: p.day,
      type: p.type,
      load: p.load,
      version: adjustedPlan ? 2 : 1,
      isAdjusted: adjustedPlan,
    })),
  });

  return {
    goal,
    plans,
  };
};
