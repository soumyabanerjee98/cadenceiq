import { verifyToken } from '@/lib/jwt.js';
import type { Request, Response, NextFunction } from 'express';

export const authMiddleware = (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
