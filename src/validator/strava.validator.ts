import { z } from 'zod';

export const newConnectionParamsSchema = z.object({
  newConnection: z.string().optional(),
  resetData: z.string().optional(),
});

export const stravaCallBackValidator = z.object({
  code: z.string(),
  scope: z.string(),
  state: z.string(),
});
