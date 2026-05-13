import { authMiddleware } from '@/middleware/jwt.middleware.js';
import authRouter from '@/routes/v1/auth.route.js';
import stravaRouter from '@/routes/v1/strava.route.js';
import activityRouter from '@/routes/v1/activity.route.js';
import goalRouter from '@/routes/v1/goal.route.js';
import insightRouter from '@/routes/v1/insight.route.js';
import { Router } from 'express';

const router = Router();

router.use('/auth', authRouter);
router.use('/strava', stravaRouter);
router.use('/activity', authMiddleware, activityRouter);
router.use('/goal', authMiddleware, goalRouter);
router.use('/insight', authMiddleware, insightRouter);

export default router;
