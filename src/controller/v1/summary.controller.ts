import { summaryService } from '@/service/index.js';
import type { Request, Response } from 'express';

export const getGoalSummary = async (
  req: Request & { user?: any },
  res: Response,
) => {
  const userId = req.user.userId;
  const date = new Date(req.query.date as string);

  const result = await summaryService.getGoalSummary(userId, date);

  return res.json(result);
};

export const getGoalSummaryInsight = async (
  req: Request & { user?: any },
  res: Response,
) => {
  const summaryId = req.params.summaryId as string;

  const result = await summaryService.getAISummary(summaryId);

  return res.json(result);
};
