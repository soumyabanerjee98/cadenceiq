import { authController } from '@/controller/index.js';
import { Router } from 'express';

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

export default router;
