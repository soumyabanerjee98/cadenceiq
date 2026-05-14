import { summaryController } from '@/controller/index.js';
import { validate } from '@/middleware/validate.middleware.js';
import { getDailyInsightsParamsSchema } from '@/validator/insight.validator.js';
import { getWeeklySummaryParamsSchema } from '@/validator/summary.validator.js';
import { Router } from 'express';

const router = Router();

router.get(
  '/get-summary',
  validate({ params: getWeeklySummaryParamsSchema }),
  summaryController.getWeeklySummary,
);

export default router;
