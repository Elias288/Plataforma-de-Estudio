import { Router } from 'express';
import { authorizeRole } from '@/middlewares/role.middleware';
import { Role } from '@prisma/client';
import { authenticate } from '@/middlewares/auth.middleware';
import { AuthController } from './auth.controller';

export const authRouter = Router();

authRouter.post(
  '/register',
  authenticate,
  authorizeRole([Role.ADMIN]),
  AuthController.register,
);

authRouter.post('/login', AuthController.login);

authRouter.get('/userInfo', authenticate, AuthController.userInfo);
