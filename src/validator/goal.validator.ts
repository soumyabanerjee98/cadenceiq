import { z } from 'zod';

export const goalInputSchema = z.object({
  currentLoad: z.number(),
  targetLoad: z.number(),
  adjustedLoad: z.number(),
  fatigue: z.number(),
  fitness: z.number(),
  readiness: z.number(),
  plan: z.array(
    z.object({
      date: z.coerce.date(),
      type: z.enum([
        'rest',
        'recovery',
        'endurance',
        'easy',
        'tempo',
        'threshold',
        'VO2',
        'sprint',
        'long',
      ]),
      title: z.string(),
      description: z.string(),
      instructions: z.string(),
      targetLoad: z.number(),
      targetDistance: z.number(),
      targetDuration: z.number(),
    }),
  ),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  experienceLevel: z.enum(['beginner', 'intermediate', 'advanced']),
  customGoalRequest: z.string().optional(),
});

export const goalCompletionEvaluationSchema = z.object({
  goalId: z.string(),
});
