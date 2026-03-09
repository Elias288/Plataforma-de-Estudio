import request from 'supertest';
import { app } from '@/app';
import { Gender, PrismaClient, Role } from '@prisma/client';
import { loginUser } from '../helpers/auth';
import { createUser } from '../helpers/users';

const prisma = new PrismaClient();

describe('User', () => {
  describe('GET', () => {
    it('Admin puede listar todos los usuarios', async () => {
      const admin = await createUser(prisma, 'ADMIN', 'admin@test.com');
      await createUser(prisma, 'ALUMNO', 'alumno@test.com');
      await createUser(prisma, 'PROFESOR', 'profesor@test.com');
      const token = await loginUser(admin.email, 'hashed');

      const res = await request(app)
        .get('/user')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body).length(3);
    });

    it('Profesor puede listar todos los alumnos', async () => {
      await createUser(prisma, 'ADMIN', 'admin@test.com');
      await createUser(prisma, 'ALUMNO', 'alumno@test.com');
      const profesor = await createUser(
        prisma,
        'PROFESOR',
        'profesor@test.com',
      );
      const token = await loginUser(profesor.email, 'hashed');

      const res = await request(app)
        .get('/user')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body).length(1);
    });

    it('Alumno no puede listar usuarios', async () => {
      await createUser(prisma, 'ADMIN', 'admin@test.com');
      const alumno = await createUser(prisma, 'ALUMNO', 'alumno@test.com');
      await createUser(prisma, 'PROFESOR', 'profesor@test.com');
      const token = await loginUser(alumno.email, 'hashed');

      const res = await request(app)
        .get('/user')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(403);
    });
  });

  describe('PATCH', () => {
    it('200 - Admin puede editar cualquier usuario', async () => {
      const admin = await createUser(prisma, 'ADMIN', 'admin@test.com');
      const alumno = await createUser(prisma, 'ALUMNO', 'alumno@test.com');
      await createUser(prisma, 'PROFESOR', 'profesor@test.com');
      const token = await loginUser(admin.email, 'hashed');

      const res = await request(app)
        .patch(`/user/${alumno.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'alumno2',
          age: 20,
          gender: Gender.MALE,
          role: Role.PROFESOR,
        });

      expect(res.status).toBe(200);
      expect(res.body.name).toBe('alumno2');
      expect(res.body.gender).toBe(Gender.MALE);
      expect(res.body.age).toBe(20);
    });

    it('200 - Usuario puede editar su información', async () => {
      const alumno = await createUser(prisma, 'ALUMNO', 'alumno@test.com');
      const token = await loginUser(alumno.email, 'hashed');

      const res = await request(app)
        .patch(`/user/${alumno.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'alumno2',
          age: 20,
          gender: Gender.MALE,
        });

      expect(res.status).toBe(200);
      expect(res.body.name).toBe('alumno2');
      expect(res.body.gender).toBe(Gender.MALE);
      expect(res.body.age).toBe(20);
    });

    it('403 - Usuario no puede editar información de otro usuario', async () => {
      const alumno = await createUser(prisma, 'ALUMNO', 'alumno@test.com');
      const alumno2 = await createUser(prisma, 'ALUMNO', 'alumno2@test.com');
      const token = await loginUser(alumno.email, 'hashed');

      const res = await request(app)
        .patch(`/user/${alumno2.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'alumno3',
          gender: Gender.MALE,
        });

      expect(res.status).toBe(403);
    });

    it('403 - Usuario no administrador no puede editar roles', async () => {
      const alumno = await createUser(prisma, 'ALUMNO', 'alumno@test.com');
      const token = await loginUser(alumno.email, 'hashed');

      const res = await request(app)
        .patch(`/user/${alumno.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'alumno3',
          gender: Gender.MALE,
          role: Role.ADMIN,
        });

      expect(res.status).toBe(403);
    });
  });
});
