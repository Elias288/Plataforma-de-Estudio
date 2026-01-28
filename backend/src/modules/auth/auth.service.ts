import { Role } from '@prisma/client';
import { prisma } from '../../config/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '../../config/env';

export async function registerUser(
  email: string,
  password: string,
  role: Role,
) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error('El Email ya está siendo usado.');

  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role,
    },
  });
}

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Credenciales invalidas.');

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('Credenciales invalidas.');

  const token = jwt.sign({ userId: user.id, role: user.role }, env.JWT_SECRET, {
    expiresIn: '1d',
  });

  return { token };
}
