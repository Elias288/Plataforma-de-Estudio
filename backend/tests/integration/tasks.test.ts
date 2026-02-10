import { app } from '@/app';
import request from 'supertest';
import { describe, it, expect } from 'vitest';
import { PrismaClient } from '@prisma/client';
import { createTask } from '../helpers/tasks';
import { createUser } from '../helpers/users';
import { createCourse } from '../helpers/courses';
import { loginUser } from '../helpers/auth';

const prisma = new PrismaClient();

describe('Tasks', () => {
  describe('GET Tasks', () => {
    it('Admin puede listar tareas de cualquier curso', async () => {
      const admin = await createUser(prisma, 'ADMIN', 'admin@test.com');
      const profesor = await createUser(prisma, 'PROFESOR', 'prof@test.com');
      const curso = await createCourse({
        prisma,
        name: 'Curso 1',
        professorId: profesor.id,
      });
      await createTask({
        prisma,
        title: 'Tarea 1',
        courseId: curso.id,
        dueDate: new Date('2026-02-10'),
      });

      const token = await loginUser(admin.email, 'hashed');

      const res = await request(app)
        .get(`/courses/${curso.id}/tasks`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
    });

    it('Profesor puede listar tareas de sus curso', async () => {
      const profesor = await createUser(prisma, 'PROFESOR', 'prof@test.com');
      const curso = await createCourse({
        prisma,
        name: 'Curso 1',
        professorId: profesor.id,
      });
      await createTask({
        prisma,
        title: 'Tarea 1',
        courseId: curso.id,
        dueDate: new Date('2026-02-10'),
      });

      const token = await loginUser(profesor.email, 'hashed');

      const res = await request(app)
        .get(`/courses/${curso.id}/tasks`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
    });

    it('Profesor no puede listar tareas de otros cursos', async () => {
      const profesor = await createUser(prisma, 'PROFESOR', 'prof@test.com');
      const profesor2 = await createUser(prisma, 'PROFESOR', 'prof2@test.com');
      const curso = await createCourse({
        prisma,
        name: 'Curso 1',
        professorId: profesor2.id,
      });
      await createTask({
        prisma,
        title: 'Tarea 1',
        courseId: curso.id,
        dueDate: new Date('2026-02-10'),
      });

      const token = await loginUser(profesor.email, 'hashed');

      const res = await request(app)
        .get(`/courses/${curso.id}/tasks`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(403);
    });

    it('Alumno puede listar tareas de cursos asignados', async () => {
      const profesor = await createUser(prisma, 'PROFESOR', 'prof@test.com');
      const alumno = await createUser(prisma, 'ALUMNO', 'alumno@test.com');
      const curso = await createCourse({
        prisma,
        name: 'Curso 1',
        professorId: profesor.id,
        studentsIds: [alumno.id],
      });
      await createTask({
        prisma,
        title: 'Tarea 1',
        courseId: curso.id,
        dueDate: new Date('2026-02-10'),
      });

      const token = await loginUser(alumno.email, 'hashed');

      const res = await request(app)
        .get(`/courses/${curso.id}/tasks`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.length).equal(1);
    });

    it('Alumno no puede listar tareas de cursos no asignados', async () => {
      const profesor = await createUser(prisma, 'PROFESOR', 'prof@test.com');
      const alumno = await createUser(prisma, 'ALUMNO', 'alumno@test.com');
      const curso = await createCourse({
        prisma,
        name: 'Curso 1',
        professorId: profesor.id,
      });
      await createTask({
        prisma,
        title: 'Tarea 1',
        courseId: curso.id,
        dueDate: new Date('2026-02-10'),
      });

      const token = await loginUser(alumno.email, 'hashed');

      const res = await request(app)
        .get(`/courses/${curso.id}/tasks`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(403);
    });
  });

  describe('POST Tasks', () => {
    it('Admin puede crear tareas en cualquier curso', async () => {
      const admin = await createUser(prisma, 'ADMIN', 'admin@test.com');
      const profesor = await createUser(prisma, 'PROFESOR', 'prof@test.com');
      const curso = await createCourse({
        prisma,
        name: 'Curso 1',
        professorId: profesor.id,
      });

      const token = await loginUser(admin.email, 'hashed');

      const res = await request(app)
        .post(`/courses/${curso.id}/tasks`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'tarea 1',
          description: 'descripción válida',
          dueDate: new Date('2026-02-10'),
        });

      expect(res.status).toBe(201);
    });

    it('Profesor puede crear tareas en curso', async () => {
      const profesor = await createUser(prisma, 'PROFESOR', 'prof@test.com');
      const curso = await createCourse({
        prisma,
        name: 'Curso 1',
        professorId: profesor.id,
      });

      const token = await loginUser(profesor.email, 'hashed');

      const res = await request(app)
        .post(`/courses/${curso.id}/tasks`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'tarea 1',
          description: 'descripción válida',
          dueDate: new Date('2026-02-10'),
        });

      expect(res.status).toBe(201);
    });

    it('Profesor no puede crear tareas en otro curso', async () => {
      const profesor = await createUser(prisma, 'PROFESOR', 'prof@test.com');
      const profesor2 = await createUser(prisma, 'PROFESOR', 'prof2@test.com');
      const curso = await createCourse({
        prisma,
        name: 'Curso 1',
        professorId: profesor.id,
      });

      const token = await loginUser(profesor2.email, 'hashed');

      const res = await request(app)
        .post(`/courses/${curso.id}/tasks`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'Tarea 1',
          description: 'descripción válida',
          dueDate: new Date('2026-02-10'),
        });

      expect(res.status).toBe(403);
    });

    it('Alumno no puede crear tareas en otro curso', async () => {
      const profesor = await createUser(prisma, 'PROFESOR', 'prof@test.com');
      const alumno = await createUser(prisma, 'ALUMNO', 'alumno@test.com');
      const curso = await createCourse({
        prisma,
        name: 'Curso 1',
        professorId: profesor.id,
      });

      const token = await loginUser(alumno.email, 'hashed');

      const res = await request(app)
        .post(`/courses/${curso.id}/tasks`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'tarea 1',
          description: 'descripción válida',
          dueDate: new Date('2026-02-10'),
        });

      expect(res.status).toBe(403);
    });
  });

  // describe('PATCH Tasks', () => {});
});
