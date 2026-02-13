import { Role } from '@prisma/client';
import { prisma } from '@/config/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '@/config/env';
import { AppError } from '@/errors/app.error';
import { UpdateUserDto } from './auth.dto';

export class AuthService {
  static async registerUser(
    email: string,
    name: string,
    password: string,
    role: Role,
  ) {
    const existing = await prisma.user.findUnique({ where: { email } });

    if (existing) throw new AppError('El Email ya está siendo usado.');

    const hashedPassword = await bcrypt.hash(password, 10);

    return prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role,
      },
    });
  }

  static async loginUser(email: string, pass: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new AppError('Credenciales invalidas.1', 401);

    const valid = await bcrypt.compare(pass, user.password);
    if (!valid) throw new AppError('Credenciales invalidas.2', 401);

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      env.JWT_SECRET,
      {
        expiresIn: '1d',
      },
    );
    const publicUser = {
      email: user.email,
      id: user.id,
      role: user.role,
    };

    return { token, user: publicUser };
  }

  static async getUserInfo(user_id: string) {
    return await prisma.user.findUnique({
      where: { id: user_id },
      include: {
        courses: {},
      },
      omit: {
        password: true,
        id: true,
      },
    });
  }

  static async updateUserInfo(
    userId: string,
    role: Role,
    userToUpdateId: string,
    data: UpdateUserDto,
  ) {
    const user = await prisma.user.findUnique({
      where: { id: userToUpdateId },
    });
    if (!user) throw new AppError('Usuario no encontrado', 404);

    if (role === Role.ADMIN)
      return prisma.user.update({
        where: { id: userToUpdateId },
        data: { ...data },
      });

    /* Usuarios no admins no pueden cambiar roles */
    if (userId === userToUpdateId) {
      const { role, ...rest } = data;
      return prisma.user.update({
        where: { id: userToUpdateId },
        data: { ...rest },
      });
    }

    throw new AppError('Prohibido', 403);
  }
}
