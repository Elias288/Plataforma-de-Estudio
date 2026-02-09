import { prisma } from '@/config/db';
import { PrismaClient, Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

type CreateCourseInput = {
  title: string;
  description?: string;
  dueDate: Date;
  courseId: string;
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
};

export async function createTask({
  prisma,
  title,
  description = 'Descripción de tarea válida',
  dueDate,
  courseId,
}: CreateCourseInput) {
  return prisma.task.create({
    data: {
      title,
      description,
      dueDate,
      course: {
        connect: { id: courseId },
      },
    },
  });
}
