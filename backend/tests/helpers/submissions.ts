import { PrismaClient, Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

type CreateSubmissionInput = {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
  description?: string;
  repoUrl?: string;
  studentId: string;
  taskId: string;
};
export async function createSubmission({
  prisma,
  description = 'descripción válida',
  repoUrl = 'repo url',
  taskId,
  studentId,
}: CreateSubmissionInput) {
  return prisma.submission.create({
    data: {
      description,
      studentId,
      repoUrl,
      taskId,
    },
  });
}
