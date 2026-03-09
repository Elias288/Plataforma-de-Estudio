import z from 'zod';

export const userSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
  role: z.enum(['ADMIN', 'PROFESOR', 'ALUMNO']),
  name: z.string().min(3).optional(),
  age: z.number().min(15).max(130).optional(),
  gender: z.enum(['MALE', 'FEMALE']).optional(),
});

export const updateUserSchema = userSchema.partial();
export type UpdateUserDto = z.infer<typeof updateUserSchema>;
