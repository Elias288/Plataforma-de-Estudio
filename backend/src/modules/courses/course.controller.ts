import { AppError } from '../../errors/app.error';
import { createCourseSchema } from './course.dto';
import { CourseService } from './course.service';
import { Request, Response } from 'express';

export class CourseController {
  /* CREAR CURSO */
  static async create(req: Request, res: Response) {
    const data = createCourseSchema.parse(req.body);
    const courses = await CourseService.create(data);
    res.status(201).json(courses);
  }

  /* LISTAR CURSOS */
  static async list(req: Request, res: Response) {
    const user = req.user!;
    const courses = await CourseService.listForUser(user.id, user.role);
    res.json(courses);
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params;
    const user = req.user!;

    if (Array.isArray(id))
      return new AppError('Error con el parámetro ingresado', 400);
    const course = await CourseService.getById(id, user.id, user.role);

    res.json(course);
  }
}
