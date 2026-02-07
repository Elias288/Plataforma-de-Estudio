import { AppError } from '@/errors/app.error';
import { createCourseSchema, addStudentSchema } from './course.dto';
import { CourseService } from './course.service';
import { Request, Response } from 'express';

export class CourseController {
  /* CREAR CURSO */
  static async create(req: Request, res: Response) {
    const data = createCourseSchema.parse(req.body);
    const courses = await CourseService.create(data);
    res.status(201).json(courses);
  }

  /* AGREGAR ALUMNOS A CURSO */
  static async addStudent(req: Request, res: Response) {
    const { id } = req.params;
    const data = addStudentSchema.parse(req.body);
    const user = req.user!;

    if (Array.isArray(id))
      return new AppError('Error con el parámetro ingresado', 400);

    const course = await CourseService.addAlumnoToCourse(
      id,
      data,
      user.id,
      user.role,
    );

    res.json(course);
  }

  /* QUITAR ALUMNOS DE CURSO */
  static async removeStudents(req: Request, res: Response) {
    const { id } = req.params;
    const data = addStudentSchema.parse(req.body);
    const user = req.user!;

    if (Array.isArray(id))
      return new AppError('Error con el parámetro ingresado', 400);

    const course = await CourseService.removeAlumnoOfCourse(
      id,
      data,
      user.id,
      user.role,
    );

    res.json(course);
  }

  /* LISTAR CURSOS */
  static async list(req: Request, res: Response) {
    const user = req.user!;
    const courses = await CourseService.listForUser(user.id, user.role);
    res.json(courses);
  }

  /* Obtener curso por ID */
  static async getById(req: Request, res: Response) {
    const { id } = req.params;
    const user = req.user!;

    if (Array.isArray(id))
      return new AppError('Error con el parámetro ingresado', 400);
    const course = await CourseService.getById(id, user.id, user.role);

    res.json(course);
  }
}
