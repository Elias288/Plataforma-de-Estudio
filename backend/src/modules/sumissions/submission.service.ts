import { Role } from '@prisma/client';
import { prisma } from '@/config/db';
import { AppError } from '@/errors/app.error';
import { CreateSubmissionDto, SubmitGradeDto } from './submission.dto';

export class SubmissionService {
  static async submit(
    taskId: string,
    userId: string,
    data: CreateSubmissionDto,
  ) {
    const task = await prisma.task.findUnique({
      where: { id: taskId },
      include: {
        course: {
          include: {
            students: { select: { id: true } },
          },
        },
      },
    });
    if (!task) throw new AppError('Tarea no encontrada', 404);

    const isStudent = task.course.students.some((s) => s.id === userId);
    if (!isStudent) throw new AppError('Alumno no inscrito al curso', 403);

    return prisma.submission.create({
      data: {
        ...data,
        taskId,
        studentId: userId,
      },
    });
  }

  static async listByCourse(userId: string, role: Role, courseId: string) {
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        tasks: {
          include: {
            submissions: {},
          },
        },
      },
    });
    if (!course) throw new AppError('No se encontró el curso', 404);

    if (role === Role.ALUMNO) {
      return course.tasks.map((t) =>
        t.submissions.find((s) => s.studentId === userId),
      );
    }

    if (role === Role.ADMIN || course.professorId === userId) {
      return course.tasks.flatMap((t) => t.submissions);
    }

    throw new AppError('Prohibido', 403);
  }

  static async listByTask(taskId: string, userId: string, role: Role) {
    const task = await prisma.task.findUnique({
      where: { id: taskId },
      include: {
        course: true,
        submissions: true,
      },
    });

    if (!task) throw new AppError('Tarea no encontrada', 404);

    if (task.submissions.some((s) => s.studentId === userId))
      return prisma.submission.findMany({
        where: { taskId, studentId: userId },
        include: {
          student: {
            select: {
              id: true,
              email: true,
            },
          },
        },
      });

    if (role === Role.ADMIN || task.course.professorId === userId)
      return prisma.submission.findMany({
        where: { taskId },
        include: {
          student: {
            select: {
              id: true,
              email: true,
            },
          },
        },
      });

    throw new AppError('Prohibido', 403);
  }

  static async grade(
    submissionId: string,
    userId: string,
    data: SubmitGradeDto,
  ) {
    const submission = await prisma.submission.findUnique({
      where: { id: submissionId },
      include: {
        task: {
          include: {
            course: true,
          },
        },
      },
    });

    if (!submission) throw new AppError('Entrega no encontrada', 404);
    if (submission.task.course.professorId !== userId)
      throw new AppError('Prohibido', 403);

    return prisma.submission.update({
      where: { id: submissionId },
      data: {
        grade: data.grade,
        feedback: data.feedback,
      },
    });
  }
}
