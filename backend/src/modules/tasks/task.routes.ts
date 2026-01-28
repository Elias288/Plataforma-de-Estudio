import { Router } from 'express';
import { authenticate } from '../../middlewares/auth.middleware';
import { validateParams } from '../../middlewares/params.middleware';
import { TaskController } from './task.controller';
import { courseIdSchema } from '../courses/course.dto';

const router = Router({ mergeParams: true });

router.post(
  '/',
  authenticate,
  validateParams(courseIdSchema),
  TaskController.create,
);

router.get('/', authenticate, TaskController.list);

export default router;
