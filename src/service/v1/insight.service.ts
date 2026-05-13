import { prisma } from '@/lib/prisma.js';
import { generateDailyInsights } from './ai.service.js';

export const getDailyInsights = async (userId: string, date: Date) => {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);

  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  const activities = await prisma.activity.findMany({
    where: {
      userId,
      startDate: {
        gte: start,
        lte: end,
      },
    },
  });

  const totalActualLoad = activities.reduce(
    (sum, a) => sum + (a.trainingLoad || 0),
    0,
  );

  const goal = await prisma.goal.findFirst({
    where: {
      userId,
      weekStart: { lte: date },
      weekEnd: { gte: date },
    },
    include: { plan: true },
  });

  const dayName = date.toLocaleDateString('en-US', {
    weekday: 'short',
  });

  const plan = goal?.plan.find((p) => p.day === dayName);

  const plannedLoad = plan?.load || 0;

  const deviation = totalActualLoad - plannedLoad;

  const status =
    deviation > plannedLoad * 0.2
      ? 'overtrained'
      : deviation < -plannedLoad * 0.2
        ? 'undertrained'
        : 'on_track';
  const ai = await generateDailyInsights(
    {
      plannedLoad,
      totalActualLoad,
      deviation,
      status,
    },
    3,
  );
  if (ai.type !== 'json') {
    throw new Error('Failed to generate daily insights from AI.');
  }

  const insightData = ai.value as {
    fatigueScore: number;
    strainScore: number;
    commentary: string;
  };

  const dailyInsight = await prisma.dailyInsight.upsert({
    where: {
      userId,
      date: start,
    },
    update: {
      plannedLoad,
      actualLoad: totalActualLoad,
      deviation,
      status,
      fatigueScore: insightData.fatigueScore,
      strainScore: insightData.strainScore,
      commentary: insightData.commentary,
    },
    create: {
      userId,
      goalId: goal!.id,
      date: start,
      plannedLoad,
      actualLoad: totalActualLoad,
      deviation,
      status,
      fatigueScore: insightData.fatigueScore,
      strainScore: insightData.strainScore,
      commentary: insightData.commentary,
    },
  });

  return dailyInsight;
};
