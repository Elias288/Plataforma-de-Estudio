import { authenticate } from '@/middlewares/auth.middleware';
import { Router } from 'express';
import { Role } from '@prisma/client';
import { UserController } from './user.controller';
import { authorizeRole } from '@/middlewares/role.middleware';

export const userRouter = Router();

userRouter.get(
  '/',
  authenticate,
  authorizeRole([Role.ADMIN, Role.PROFESOR]),
  UserController.list,
);

userRouter.patch('/:id', authenticate, UserController.update);
