import { authService } from '@/service/index.js';
import type { Request, Response } from 'express';

export const register = async (req: Request, res: Response) => {
  const result = await authService.register(req.body);
  res.json(result);
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await authService.login(email, password);
  res.json(result);
};
