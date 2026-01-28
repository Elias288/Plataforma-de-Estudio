import { NextFunction, Request, Response } from 'express';
import { ZodType } from 'zod';

export const validateParams =
  (schema: ZodType<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.params);
    if (!result.success)
      return res.status(400).json({
        message: 'Parámetros invalidos',
        errors: result.error.flatten(),
      });

    req.params = result.data;
    next();
  };
