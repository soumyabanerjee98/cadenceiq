import { goalService } from '@/service/index.js';
import type { Request, Response } from 'express';

export const createGoal = async (
  req: Request & { user?: any },
  res: Response,
) => {
  const userId = req.user.userId;
  const {
    currentLoad,
    targetLoad,
    fatigue,
    adjustedLoad,
    plan,
    adjustedPlan,
    startDate,
  } = req.body;

  const result = await goalService.createWeeklyGoal(userId, {
    currentLoad,
    targetLoad,
    fatigue,
    adjustedLoad,
    plan,
    adjustedPlan,
    startDate,
  });

  return res.json(result);
};
