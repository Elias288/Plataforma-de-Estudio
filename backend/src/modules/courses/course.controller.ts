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
}
