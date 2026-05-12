import { authController } from '@/controller/index.js';
import { validate } from '@/middleware/validate.middleware.js';
import { loginSchema, registerSchema } from '@/validator/auth.validator.js';
import { Router } from 'express';

const router = Router();

router.post(
  '/register',
  validate({ body: registerSchema }),
  authController.register,
);
router.post('/login', validate({ body: loginSchema }), authController.login);

export default router;
