import { Request, Response } from 'express';
import { AppError } from '@/errors/app.error';
import { SubmissionService } from './submission.service';
import { createSubmissionSchema, submitGradeSchema } from './submission.dto';

export class SubmissionController {
  static async submit(req: Request, res: Response) {
    const { taskId } = req.params;
    const user = req.user!;
    const data = createSubmissionSchema.parse(req.body);

    if (Array.isArray(taskId))
      return new AppError('Error con el parámetro ingresado', 400);

    const submission = await SubmissionService.submit(taskId, user.id, data);

    res.status(201).json(submission);
  }

  static async list(req: Request, res: Response) {
    const { taskId } = req.params;
    const user = req.user!;

    if (Array.isArray(taskId))
      return new AppError('Error con el parámetro ingresado', 400);

    const submission = await SubmissionService.listByTask(
      taskId,
      user.id,
      user.role,
    );

    res.json(submission);
  }

  static async grade(req: Request, res: Response) {
    const { submissionId } = req.params;
    const user = req.user!;
    const data = submitGradeSchema.parse(req.body);

    if (Array.isArray(submissionId))
      return new AppError('Error con el parámetro ingresado', 400);

    const submission = await SubmissionService.grade(
      submissionId,
      user.id,
      user.role,
      data,
    );

    res.json(submission);
  }
}
