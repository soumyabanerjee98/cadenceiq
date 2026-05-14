import { z } from 'zod';

export const getWeeklySummaryParamsSchema = z.object({
  date: z
    .string()
    .optional()
    .transform((val) => (val ? new Date(val) : new Date())),
});
