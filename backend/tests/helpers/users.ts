import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import bcrypt from 'bcrypt';

export async function createUser(
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
  role: 'ADMIN' | 'PROFESOR' | 'ALUMNO',
  email: string,
) {
  return prisma.user.create({
    data: {
      email,
      password: await bcrypt.hash('hashed', 10),
      role,
    },
  });
}
