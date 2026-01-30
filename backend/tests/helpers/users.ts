import { prisma } from '@/config/db';
import bcrypt from 'bcrypt';

export async function createUser(
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
