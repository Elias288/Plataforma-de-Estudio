import { Role } from '@prisma/client';
import { CreateTaskDto } from './task.dto';
import { prisma } from '@/config/db';
import { AppError } from '@/errors/app.error';

export class TaskService {
  static async create(
    courseId: string,
    data: CreateTaskDto,
    userId: string,
    role: Role,
  ) {
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) throw new AppError('Curso no encontrado', 404);

    if (role !== Role.ADMIN && course.professorId !== userId)
      throw new AppError('Prohibido', 403);

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
      throw new AppError('Curso no encontrado', 404);
    }

    if (
      role === Role.ADMIN ||
      course.professorId === userId ||
      course.students.some((s) => s.id === userId)
    ) {
      return prisma.task.findMany({
        where: { courseId },
        orderBy: { dueDate: 'asc' },
      });
    }

    throw new AppError('Prohibido', 403);
  }
}
