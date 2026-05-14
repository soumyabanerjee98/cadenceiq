import { summaryService } from '@/service/index.js';
import type { Request, Response } from 'express';

export const getWeeklySummary = async (
  req: Request & { user?: any },
  res: Response,
) => {
  const userId = req.user.userId;
  const date = new Date(req.query.date as string);

  const result = await summaryService.getWeeklySummary(userId, date);

  return res.json(result);
};
