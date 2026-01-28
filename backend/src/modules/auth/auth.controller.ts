import { Response, Request } from 'express';
import { loginSchema, registerSchema } from './auth.schema';
import { loginUser, registerUser } from './auth.service';

export async function register(req: Request, res: Response) {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error);

  const user = await registerUser(
    parsed.data.email,
    parsed.data.password,
    parsed.data.role,
  );

  res.status(201).json({ id: user.id, email: user.email });
}

export async function login(req: Request, res: Response) {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error);

  const result = await loginUser(parsed.data.email, parsed.data.password);
  return res.json(result);
}
