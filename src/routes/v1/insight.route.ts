import { insightController } from '@/controller/index.js';
import { validate } from '@/middleware/validate.middleware.js';
import { getDailyInsightsParamsSchema } from '@/validator/insight.validator.js';
import { Router } from 'express';

const router = Router();

router.get(
  '/get-insight',
  validate({ params: getDailyInsightsParamsSchema }),
  insightController.createDailyInsight,
);

export default router;
