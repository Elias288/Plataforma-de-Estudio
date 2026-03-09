import { Request, Response } from 'express';
import { UserService } from './user.service';
import { AppError } from '@/errors/app.error';
import { updateUserSchema, userSchema } from './user.dto';

export class UserController {
  static async list(req: Request, res: Response) {
    const user = req.user!;

    const response = await UserService.listForUser({ role: user.role });
    res.json(response);
  }

  static async update(req: Request, res: Response) {
    const user = req.user!;
    const { id: updatedUserId } = req.params;
    const data = updateUserSchema.parse(req.body);

    if (Array.isArray(updatedUserId))
      return new AppError('Error con el parámetro ingresado', 400);

    const updatedUser = await UserService.updateUser({
      updatedUserId,
      userId: user.id,
      role: user.role,
      userInfo: data,
    });

    res.status(200).json(updatedUser);
  }
}
