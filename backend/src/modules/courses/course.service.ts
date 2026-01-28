import { Role } from '@prisma/client';
import { prisma } from '../../config/db';
import { CreateCourseDto } from './course.dto';

export class CourseService {
  static async create(data: CreateCourseDto) {
    console.log(data);

    const professor = await prisma.user.findUnique({
      where: { id: data.professorId },
    });

    /* if (!professor || professor.role !== Role.PROFESOR)
      throw new Error('Profesor invalido'); */

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
}
