import request from 'supertest';
import { app } from '@/app';

export async function registerUser(data: {
  email: string;
  password: string;
  role: 'ADMIN' | 'PROFESOR' | 'ALUMNO';
}) {
  return request(app).post('/auth/register').send(data);
}

export async function loginUser(email: string, password: string) {
  const res = await request(app).post('/auth/login').send({ email, password });
  return res.body.token as string;
}
