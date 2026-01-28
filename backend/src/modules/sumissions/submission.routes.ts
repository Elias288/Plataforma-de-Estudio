import { Router } from 'express';
import { SubmissionController } from './submission.controller';
import { authenticate } from '../../middlewares/auth.middleware';
import { validateParams } from '../../middlewares/params.middleware';
import { submissionIdSchema } from './submission.dto';

const router = Router({ mergeParams: true });

router.post('/', authenticate, SubmissionController.submit);

router.get('/', authenticate, SubmissionController.list);

router.patch(
  '/:submissionId/grade',
  authenticate,
  validateParams(submissionIdSchema),
  SubmissionController.grade,
);

export default router;
