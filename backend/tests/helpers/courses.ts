import { prisma } from '@/config/db';

type CreateCourseInput = {
  name: string;
  description?: string;
  professorId: string;
  studentsIds?: string[];
};

export async function createCourse({
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
