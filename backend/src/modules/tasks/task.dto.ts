import z from 'zod';

export const createTaskSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  dueDate: z.date(),
});

export type CreateTaskDto = z.infer<typeof createTaskSchema>;
