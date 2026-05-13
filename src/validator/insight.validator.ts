import { z } from 'zod';

export const getDailyInsightsParamsSchema = z.object({
  date: z
    .string()
    .optional()
    .transform((val) => (val ? new Date(val) : new Date())),
});
