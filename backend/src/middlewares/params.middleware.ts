import { NextFunction, Request, Response } from 'express';
import { z, ZodType } from 'zod';

export const validateParams =
  (schema: ZodType<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.params);
    if (!result.success)
      return res.status(400).json({
        message: 'Parámetros invalidos',
        errors: z.treeifyError(result.error),
      });

    req.params = result.data;
    next();
  };
