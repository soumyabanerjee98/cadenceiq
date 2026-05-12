import { stravaService } from '@/service/index.js';
import type { Request, Response } from 'express';

export const connectStrava = (req: Request & { user?: any }, res: Response) => {
  const userId = req.user.userId;
  const result = stravaService.connectStrava({ userId });
  res.redirect(result);
};

export const stravaCallback = async (req: Request, res: Response) => {
  const { code, state } = req.query;
  const decoded = JSON.parse(Buffer.from(state as string, 'base64').toString());
  const userId = decoded.userId;
  const result = await stravaService.stravaCallback({
    code: code as string,
    userId,
  });
  res.json(result);
};
