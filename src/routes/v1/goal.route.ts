import { goalController } from '@/controller/index.js';
import { validate } from '@/middleware/validate.middleware.js';
import {
  goalCompletionEvaluationSchema,
  goalInputSchema,
} from '@/validator/goal.validator.js';
import { Router } from 'express';

const router = Router();

router.post(
  '/create-goal',
  validate({ body: goalInputSchema }),
  goalController.createGoal,
);

router.get('/current-goal', goalController.getCurrentGoal);
router.get(
  '/evaluate-goal-completion/:goalId',
  validate({ params: goalCompletionEvaluationSchema }),
  goalController.evaluateGoalCompletion,
);

export default router;
