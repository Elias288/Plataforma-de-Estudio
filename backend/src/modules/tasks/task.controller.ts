import { Request, Response } from 'express';
import { TaskService } from './task.service';
import { AppError } from '@/errors/app.error';
import { createTaskSchema } from './task.dto';

export class TaskController {
  static async create(req: Request, res: Response) {
    const { id: courseId } = req.params;
    const data = createTaskSchema.parse(req.body);
    const user = req.user!;

    if (Array.isArray(courseId))
      return new AppError('Error con el parámetro ingresado', 400);

    const task = await TaskService.create(courseId, data, user.id, user.role);

    res.status(201).json(task);
  }

  static async list(req: Request, res: Response) {
    const { id: courseId } = req.params;
    const user = req.user!;

    if (Array.isArray(courseId))
      return new AppError('Error con el parámetro ingresado', 400);

    const tasks = await TaskService.listByCourse(courseId, user.id, user.role);

    res.json(tasks);
  }
}
