import z, { email } from 'zod';

export const registerSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
  role: z.enum(['ADMIN', 'PROFESOR', 'ALUMNO']),
});

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});
