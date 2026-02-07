import { Role } from '@prisma/client';
import { prisma } from '@/config/db';
import { CreateCourseDto, StudentsCourseDto } from './course.dto';
import { AppError } from '@/errors/app.error';

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

  static async addAlumnoToCourse(
    courseId: string,
    alumnos: StudentsCourseDto,
    userId: string,
    role: Role,
  ) {
    const existentes = await prisma.user.findMany({
      where: { id: { in: alumnos.students }, role: Role.ALUMNO },
      select: { id: true },
    });

    if (existentes.length !== alumnos.students.length) {
      throw new AppError('Alguno de los alumnos no existe', 400);
    }

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

    if (role !== Role.ADMIN && course.professorId !== userId)
      throw new AppError('Prohibido', 403);

    return prisma.course.update({
      where: { id: courseId },
      data: {
        students: {
          set: alumnos.students.map((id) => ({ id })),
        },
      },
      include: { students: true },
    });
  }

  static async removeAlumnoOfCourse(
    courseId: string,
    alumnos: StudentsCourseDto,
    userId: string,
    role: Role,
  ) {
    const existentes = await prisma.user.findMany({
      where: { id: { in: alumnos.students }, role: Role.ALUMNO },
      select: { id: true },
    });

    if (existentes.length !== alumnos.students.length) {
      throw new AppError('Alguno de los alumnos no existe', 400);
    }

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

    if (role !== Role.ADMIN && course.professorId !== userId)
      throw new AppError('Prohibido', 403);

    return prisma.course.update({
      where: { id: course.id },
      data: {
        students: {
          disconnect: alumnos.students.map((id) => ({ id })),
        },
      },
      include: { students: true },
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
