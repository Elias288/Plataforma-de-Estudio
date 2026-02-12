import { Role } from '@prisma/client';
import { prisma } from '@/config/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '@/config/env';
import { AppError } from '@/errors/app.error';

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

export async function loginUser(email: string, pass: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new AppError('Credenciales invalidas.1', 401);

  const valid = await bcrypt.compare(pass, user.password);
  if (!valid) throw new AppError('Credenciales invalidas.2', 401);

  const token = jwt.sign({ userId: user.id, role: user.role }, env.JWT_SECRET, {
    expiresIn: '1d',
  });
  const { password, ...publicUser } = user;

  return { token, user: publicUser };
}
