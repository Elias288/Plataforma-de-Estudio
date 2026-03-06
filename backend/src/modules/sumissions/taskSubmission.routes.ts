import { Router } from 'express';
import { SubmissionController } from './courseSubmission.controller';
import { authenticate } from '@/middlewares/auth.middleware';
import { validateParams } from '@/middlewares/params.middleware';
import { submissionIdSchema } from './submission.dto';
import { authorizeRole } from '@/middlewares/role.middleware';
import { Role } from '@prisma/client';

const router = Router({ mergeParams: true });

router.post(
  '/',
  authenticate,
  authorizeRole([Role.ALUMNO]),
  SubmissionController.submit,
);

router.get('/', authenticate, SubmissionController.listTaskSubmissions);

router.patch(
  '/:submissionId/grade',
  authenticate,
  validateParams(submissionIdSchema),
  authorizeRole([Role.PROFESOR]),
  SubmissionController.grade,
);

export default router;
