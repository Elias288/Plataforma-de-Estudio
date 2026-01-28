import z from 'zod';

export const createCourseSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  professorId: z.uuid(),
  studentsIds: z.array(z.uuid()).optional(),
});

export type CreateCourseDto = z.infer<typeof createCourseSchema>;
