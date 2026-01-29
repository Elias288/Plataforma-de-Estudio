import { Router } from 'express';
import { authenticate } from '../../middlewares/auth.middleware';
import { validateParams } from '../../middlewares/params.middleware';
import { TaskController } from './task.controller';
import { courseIdSchema } from '../courses/course.dto';
import submissionRoutes from '../sumissions/submission.routes';
import { authorizeRole } from '../../middlewares/role.middleware';
import { Role } from '@prisma/client';

const router = Router({ mergeParams: true });

router.post(
  '/',
  authenticate,
  validateParams(courseIdSchema),
  authorizeRole([Role.ADMIN, Role.PROFESOR]),
  TaskController.create,
);

router.get('/', authenticate, TaskController.list);

router.use('/:taskId/submissions', submissionRoutes);

export default router;
