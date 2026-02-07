import z from 'zod';

const studentsSchema = z.array(z.uuid());
export const createCourseSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  professorId: z.uuid(),
  studentsIds: studentsSchema.optional(),
});

export type CreateCourseDto = z.infer<typeof createCourseSchema>;

export const addStudentSchema = z.object({ students: studentsSchema });
export type StudentsCourseDto = z.infer<typeof addStudentSchema>;

export const courseIdSchema = z.object({
  id: z.uuid(),
});
