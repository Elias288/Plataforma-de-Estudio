import { Response, Request } from 'express';
import { loginSchema, registerSchema, updateUserSchema } from './auth.dto';
import { AppError } from '@/errors/app.error';
import { AuthService } from './auth.service';

export class AuthController {
  static async register(req: Request, res: Response) {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error);

    const name = parsed.data.name ?? parsed.data.email.split('@')[0];
    const user = await AuthService.registerUser(
      parsed.data.email,
      name,
      parsed.data.password,
      parsed.data.role,
    );

    res.status(201).json({ id: user.id, email: user.email });
  }

  static async login(req: Request, res: Response) {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error);

    const result = await AuthService.loginUser(
      parsed.data.email,
      parsed.data.password,
    );
    return res.json(result);
  }

  static async userInfo(req: Request, res: Response) {
    const user = req.user!;
    const response = await AuthService.getUserInfo(user.id);
    res.status(200).json(response);
  }

  static async updateUserInfo(req: Request, res: Response) {
    const { userId } = req.params;
    const user = req.user!;
    const data = updateUserSchema.parse(req.body);

    if (Array.isArray(userId))
      return new AppError('Error con el parámetro ingresado');

    const response = await AuthService.updateUserInfo(
      user.id,
      user.role,
      userId,
      data,
    );
    res.status(200).json(response);
  }
}
