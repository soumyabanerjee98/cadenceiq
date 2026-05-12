import { stravaController } from '@/controller/index.js';
import { authMiddleware } from '@/middleware/jwt.middleware.js';
import { Router } from 'express';

const router = Router();

router.post('/connect', authMiddleware, stravaController.connectStrava);
router.post('/callback', stravaController.stravaCallback);
router.all('/webhook', stravaController.handleWebhook);

export default router;
