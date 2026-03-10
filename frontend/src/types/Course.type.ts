import type { Task } from './Task.type';

export interface Course {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  professorId: string;
  professor: { id: string; email: string };
  students: string[];
  tasks: Task[];
}
