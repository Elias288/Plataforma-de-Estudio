import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '@/config/env';

interface JwtPayload {
  userId: string;
  role: string;
}

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: 'Falta Authorization header' });

  const [type, token] = authHeader.split(' ');

  if (type !== 'Bearer' || !token)
    return res
      .status(401)
      .json({ message: 'Formato invalido del Authorization' });

  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as JwtPayload;

    req.user = {
      id: payload.userId,
      role: payload.role as any,
    };
    next();
  } catch {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
}
