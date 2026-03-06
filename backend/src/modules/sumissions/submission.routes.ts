import { authenticate } from '@/middlewares/auth.middleware';
import { Router } from 'express';
import { SubmissionController } from './courseSubmission.controller';

const router = Router({ mergeParams: true });

router.get('/', authenticate, SubmissionController.listCourseSubmissions);

export default router;
