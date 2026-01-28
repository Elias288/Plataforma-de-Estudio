import { z } from 'zod';

export const submissionIdSchema = z.object({
  submissionId: z.uuid(),
});
