import type { Course } from './Course.type';

export type Role = 'ADMIN' | 'PROFESOR' | 'ALUMNO';

type Gender = 'MALE' | 'FEMALE';

export interface User {
  id: string;
  email: string;
  role: Role;
  name?: string;
  age?: number;
  gender?: Gender;
  createdAt?: Date;
  courses?: Course[];
}

export interface UserLoginInfo {
  id: string;
  email: string;
  role: Role;
}
