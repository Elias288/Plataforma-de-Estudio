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

  static async listCourseSubmissions(req: Request, res: Response) {
    const { id: courseId } = req.params;
    const user = req.user!;

    if (Array.isArray(courseId))
      return new AppError('Error con el parámetro ingresado', 400);

    const submissions = await SubmissionService.listByCourse(
      user.id,
      user.role,
      courseId,
    );
    res.status(200).json(submissions);
  }

  static async listTaskSubmissions(req: Request, res: Response) {
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
      data,
    );

    res.json(submission);
  }
}
