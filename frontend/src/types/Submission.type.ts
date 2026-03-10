export interface Submission {
  id: string;
  repoUrl: string;
  description: string;
  grade?: number;
  createdAt: Date;
  feedback?: string;
  taskId: string;
  studentId: string;
}
