import { AppError } from '@/errors/app.error';
import { NextFunction, Response, Request } from 'express';

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  console.error(err);
  res.status(500).json({ message: err.message });
}
