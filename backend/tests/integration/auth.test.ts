import request from 'supertest';
import { app } from '@/app';
import { describe, it, expect } from 'vitest';
import { Gender, PrismaClient, Role } from '@prisma/client';
import { createUser } from '../helpers/users';
import { loginUser } from '../helpers/auth';
import { createCourse } from '../helpers/courses';

const prisma = new PrismaClient();

describe('Auth', () => {
  describe('GET', () => {
    it('Obtener información del usuario logueado', async () => {
      const admin = await createUser(prisma, 'ADMIN', 'admin@test.com');
      await createCourse({
        prisma,
        name: 'Curso 1',
        professorId: admin.id,
        studentsIds: [admin.id],
      });
      const token = await loginUser(admin.email, 'hashed');

      const res = await request(app)
        .get(`/auth/userInfo`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.name).equal('admin');
    });
  });

  describe('POST', () => {
    it('Debería registra un usuario', async () => {
      const admin = await createUser(prisma, 'ADMIN', 'admin@test.com');
      const token = await loginUser(admin.email, 'hashed');

      const res = await request(app)
        .post('/auth/register')
        .set('Authorization', `Bearer ${token}`)
        .send({
          email: 'admin2@test.com',
          password: 'hashed',
          role: Role.ADMIN,
        });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.email).toBe('admin2@test.com');
    });

    it('Debería indicar correo duplicado', async () => {
      const admin = await createUser(prisma, 'ADMIN', 'admin@test.com');
      const token = await loginUser(admin.email, 'hashed');

      const res = await request(app)
        .post('/auth/register')
        .set('Authorization', `Bearer ${token}`)
        .send({
          email: 'admin@test.com',
          password: 'hashed',
          role: Role.ADMIN,
        });

      expect(res.status).toBe(400);
    });

    it('Profesor no puede crear usuario', async () => {
      const profesor = await createUser(
        prisma,
        Role.PROFESOR,
        'profesor@test.com',
      );
      const token = await loginUser(profesor.email, 'hashed');

      const res = await request(app)
        .post('/auth/register')
        .set('Authorization', `Bearer ${token}`)
        .send({
          email: 'alumno@test.com',
          password: 'hashed',
          role: Role.ALUMNO,
        });

      expect(res.status).toBe(403);
      expect(res.body.message).equal('Prohibido');
    });

    it('Alumno no puede crear usuario', async () => {
      const alumno = await createUser(prisma, Role.ALUMNO, 'alumno@test.com');
      const token = await loginUser(alumno.email, 'hashed');

      const res = await request(app)
        .post('/auth/register')
        .set('Authorization', `Bearer ${token}`)
        .send({
          email: 'alumno2@test.com',
          password: 'hashed',
          role: Role.ALUMNO,
        });

      expect(res.status).toBe(403);
      expect(res.body.message).equal('Prohibido');
    });

    it('Inicio de sesión de admin', async () => {
      const admin = await createUser(prisma, 'ADMIN', 'admin@test.com');

      const res = await request(app)
        .post(`/auth/login`)
        .send({ email: admin.email, password: 'hashed' });

      expect(res.status).toBe(200);
      expect(res.body.user.email).equal('admin@test.com');
    });
  });
});
