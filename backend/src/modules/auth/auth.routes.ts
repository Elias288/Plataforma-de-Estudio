import { Router } from 'express';
import { login, register } from './auth.controller';
import { authorizeRole } from '@/middlewares/role.middleware';
import { Role } from '@prisma/client';
import { authenticate } from '@/middlewares/auth.middleware';

export const authRouter = Router();

authRouter.post(
  '/register',
  authenticate,
  authorizeRole([Role.ADMIN]),
  register,
);
authRouter.post('/login', login);
