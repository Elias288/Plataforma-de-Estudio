import { PrismaClient, Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

type CreateCourseInput = {
  name: string;
  description?: string;
  professorId: string;
  studentsIds?: string[];
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
};

export async function createCourse({
  prisma,
  name,
  description = 'Descripción de prueba válida',
  professorId,
  studentsIds = [],
}: CreateCourseInput) {
  return prisma.course.create({
    data: {
      name,
      description,
      professorId,
      students: studentsIds.length
        ? {
            connect: studentsIds.map((id) => ({ id })),
          }
        : undefined,
    },
  });
}
