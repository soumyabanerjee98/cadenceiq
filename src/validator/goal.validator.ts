import { z } from 'zod';

export const goalInputSchema = z.object({
  currentLoad: z.number(),
  targetLoad: z.number(),
  fatigue: z.number(),
  adjustedLoad: z.number(),
  plan: z.array(
    z.object({
      day: z.string(),
      type: z.enum(['rest', 'hard', 'easy', 'long', 'recovery']),
      load: z.number(),
    }),
  ),
});
