import { Router } from 'express';
import { authenticate } from '@/middlewares/auth.middleware';
import { authorizeRole } from '@/middlewares/role.middleware';
import { Role } from '@prisma/client';
import { CourseController } from './course.controller';
import { validateParams } from '@/middlewares/params.middleware';
import { courseIdSchema } from './course.dto';
import taskRouter from '@/modules/tasks/task.routes';

const router = Router();

router.get('/', authenticate, CourseController.list);

router.put(
  '/:id/addStudents',
  authenticate,
  authorizeRole([Role.ADMIN, Role.PROFESOR]),
  validateParams(courseIdSchema),
  CourseController.addStudent,
);

router.put(
  '/:id/removeStudents',
  authenticate,
  authorizeRole([Role.ADMIN, Role.PROFESOR]),
  validateParams(courseIdSchema),
  CourseController.removeStudents,
);

router.get(
  '/:id',
  authenticate,
  validateParams(courseIdSchema),
  CourseController.getById,
);

router.post(
  '/',
  authenticate,
  authorizeRole([Role.ADMIN, Role.PROFESOR]),
  CourseController.create,
);

router.use('/:id/tasks', taskRouter);

export default router;
