import { z } from 'zod';

export const submissionIdSchema = z.object({
  submissionId: z.uuid(),
});

export const createSubmissionSchema = z.object({
  description: z.string(),
  repoUrl: z.url(),
});
export type CreateSubmissionDto = z.infer<typeof createSubmissionSchema>;

export const submitGradeSchema = z.object({
  grade: z.number(),
  feedback: z.string().optional(),
});
export type SubmitGradeDto = z.infer<typeof submitGradeSchema>;
