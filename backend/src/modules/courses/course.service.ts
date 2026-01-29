import { Role } from '@prisma/client';
import { prisma } from '../../config/db';
import { CreateCourseDto } from './course.dto';
import { AppError } from '../../errors/app.error';

export class CourseService {
  static async create(data: CreateCourseDto) {
    return prisma.course.create({
      data: {
        name: data.name,
        description: data.description,
        professorId: data.professorId,
        students: {
          connect: data.studentsIds?.map((id) => ({ id })) ?? [],
        },
      },
    });
  }

  static async listForUser(userId: string, role: Role) {
    if (role === Role.ADMIN) return prisma.course.findMany();

    if (role === Role.PROFESOR)
      return prisma.course.findMany({
        where: { professorId: userId },
      });

    return prisma.course.findMany({
      where: {
        students: {
          some: { id: userId },
        },
      },
    });
  }

  static async getById(courseId: string, userId: string, role: Role) {
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        professor: {
          select: {
            id: true,
            email: true,
          },
        },
        students: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });

    if (!course) throw new AppError('Curso no encontrado', 404);

    if (
      role === Role.ADMIN ||
      course.professorId === userId ||
      course.students.some((student) => student.id === userId)
    )
      return course;

    throw new AppError('Prohibido', 403);
  }
}
