import { Role } from '@prisma/client';
import { CreateTaskDto } from './task.dto';
import { prisma } from '../../config/db';
import { AppError } from '../../errors/app.error';

export class TaskService {
  static async create(
    courseId: string,
    userId: string,
    role: Role,
    data: CreateTaskDto,
  ) {
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) throw new AppError('Curso no encontrado', 404);

    if (role !== Role.PROFESOR || course.professorId !== userId)
      throw new AppError('Forbidden', 403);

    return prisma.task.create({
      data: {
        ...data,
        dueDate: new Date(data.dueDate),
        courseId,
      },
    });
  }

  static async listByCourse(courseId: string, userId: string, role: Role) {
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: { students: { select: { id: true } } },
    });

    if (!course) {
      throw new AppError('Course not found', 404);
    }

    if (
      role === Role.ADMIN ||
      (role === Role.PROFESOR && course.professorId === userId) ||
      (role === Role.ALUMNO && course.students.some((s) => s.id === userId))
    ) {
      return prisma.task.findMany({
        where: { courseId },
        orderBy: { dueDate: 'asc' },
      });
    }

    throw new AppError('Forbidden', 403);
  }
}
