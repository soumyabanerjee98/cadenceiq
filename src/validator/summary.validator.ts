import { z } from 'zod';

export const getGoalSummaryQuerySchema = z.object({
  date: z
    .string()
    .optional()
    .transform((val) => (val ? new Date(val) : new Date())),
});

export const getGoalSummaryInsightParamsSchema = z.object({
  summaryId: z.string(),
});
