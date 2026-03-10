import type { Submission } from './Submission.type';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date | null;
  createdAt: Date;
  courseId: string;
  submissions: Submission[];
}
