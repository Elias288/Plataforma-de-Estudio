import { Router } from 'express';
import { authenticate } from '../../middlewares/auth.middleware';
import { authorizeRole } from '../../middlewares/role.middleware';
import { Role } from '@prisma/client';
import { CourseController } from './course.controller';
import { validateParams } from '../../middlewares/params.middleware';
import { courseIdSchema } from './course.dto';

const router = Router();

router.get('/', authenticate, CourseController.list);

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

export default router;
