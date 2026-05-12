import { activityController } from '@/controller/index.js';
import { validate } from '@/middleware/validate.middleware.js';
import {
  activityParamsSchema,
  deleteActivityQuerySchema,
  goalSchema,
  previewActivitiesParamsSchema,
  syncActivitiesSchema,
} from '@/validator/activity.validator.js';
import { Router } from 'express';

const router = Router();

router.post(
  '/get-weekly-plan',
  validate({ body: goalSchema }),
  activityController.getWeeklyPlan,
);

router.get(
  '/preview-strava-activities',
  validate({ params: previewActivitiesParamsSchema }),
  activityController.previewActivities,
);
router.get(
  '/get-activities',
  validate({ params: activityParamsSchema }),
  activityController.getActivities,
);
router.post(
  '/sync-activities',
  validate({ body: syncActivitiesSchema }),
  activityController.syncActivities,
);
router.delete(
  '/delete-activity/:activityId',
  validate({ query: deleteActivityQuerySchema }),
  activityController.removeActivity,
);

export default router;
