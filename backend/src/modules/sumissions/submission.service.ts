import { Role } from '@prisma/client';
import { prisma } from '../../config/db';
import { AppError } from '../../errors/app.error';

export class SubmissionService {
  static async submit(
    taskId: string,
    userId: string,
    data: { description: string; repoUrl: string },
  ) {
    const task = await prisma.task.findUnique({
      where: { id: taskId },
      include: {
        course: {
          include: { students: { select: { id: true } } },
        },
      },
    });

    if (!task) {
      throw new AppError('Tarea no encontrada', 404);
    }

    const isStudent = task.course.students.some((s) => s.id === userId);

    if (!isStudent) {
      throw new AppError('Alumno no inscrito al curso', 403);
    }

    return prisma.submission.create({
      data: {
        ...data,
        taskId,
        studentId: userId,
      },
    });
  }

  static async listByTask(taskId: string, userId: string, role: Role) {
    const task = await prisma.task.findUnique({
      where: { id: taskId },
      include: {
        course: true,
      },
    });

    if (!task) {
      throw new AppError('Tarea no encontrada', 404);
    }

    if (task.course.professorId !== userId) {
      throw new AppError('Prohibido', 403);
    }

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
  }

  static async grade(
    submissionId: string,
    userId: string,
    role: Role,
    grade: number,
    feedback?: string,
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

    if (!submission) {
      throw new AppError('Entrega no encontrada', 404);
    }

    if (submission.task.course.professorId !== userId) {
      throw new AppError('Prohibido', 403);
    }

    return prisma.submission.update({
      where: { id: submissionId },
      data: {
        grade,
        feedback,
      },
    });
  }
}
