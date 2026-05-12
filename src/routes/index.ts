import authRouter from '@/routes/v1/auth.route.js';
import stravaRouter from '@/routes/v1/strava.route.js';
import { Router } from 'express';

const router = Router();

router.use('/auth', authRouter);
router.use('/strava', stravaRouter);

export default router;
