import { prisma } from '@/config/db';
import { AppError } from '@/errors/app.error';
import { Prisma, Role } from '@prisma/client';

type UpdateUserParams = {
  updatedUserId: string;
  userId: string;
  role: Role;
  userInfo: Prisma.UserUpdateInput;
};

export class UserService {
  static async listForUser({ role }: { role: Role }) {
    if (role === Role.ADMIN) return prisma.user.findMany();

    if (role === Role.PROFESOR)
      return prisma.user.findMany({ where: { role: Role.ALUMNO } });

    throw new AppError('Prohibido', 403);
  }

  static async updateUser({
    updatedUserId,
    userId,
    role,
    userInfo,
  }: UpdateUserParams) {
    // Si NO es ADMIN y quiere modificar otro usuario → error
    if (role !== 'ADMIN' && updatedUserId !== userId) {
      throw new AppError('No tienes permiso para modificar este usuario', 403);
    }

    if (role !== 'ADMIN' && 'role' in userInfo) {
      throw new AppError('No tienes permiso para cambiar el rol', 403);
    }

    const user = await prisma.user.update({
      where: {
        id: updatedUserId,
      },
      data: userInfo,
    });

    return user;
  }
}
