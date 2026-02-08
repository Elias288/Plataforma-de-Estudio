import { app } from '@/app';
import { prisma } from '@/config/db';
import { createUser } from '../helpers/users';
import { createCourse } from '../helpers/courses';
import request from 'supertest';
import { describe, it, expect } from 'vitest';
import { createTask } from '../helpers/tasks';

describe('Tasks', () => {
  describe('GET Tasks', () => {
    it('Admin puede listar tareas de cualquier curso', async () => {
      const admin = await createUser('ADMIN', 'admin2@test.com');
      const profesor = await createUser('PROFESOR', 'prof@test.com');
      const curso = await createCourse({
        name: 'Curso 1',
        professorId: profesor.id,
      });
      await createTask({
        title: 'Tarea 1 - curso 1',
        courseId: curso.id,
      });

      const token = await request(app)
        .post(`/auth/login`)
        .send({ email: admin.email, password: 'hashed' });

      const res = await request(app)
        .get(`/courses/${curso.id}/tasks`)
        .set('Authorization', `Bearer ${token.body.token}`);

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
    });

    it('Profesor puede listar tareas de sus curso', async () => {
      const profesor = await createUser('PROFESOR', 'prof@test.com');
      const curso = await createCourse({
        name: 'Curso 1',
        professorId: profesor.id,
      });
      await createTask({
        title: 'Tarea 1',
        courseId: curso.id,
      });

      const token = await request(app)
        .post(`/auth/login`)
        .send({ email: profesor.email, password: 'hashed' });

      const res = await request(app)
        .get(`/courses/${curso.id}/tasks`)
        .set('Authorization', `Bearer ${token.body.token}`);

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
    });

    it('Profesor no puede listar tareas de otros cursos', async () => {
      const profesor = await createUser('PROFESOR', 'prof@test.com');
      const profesor2 = await createUser('PROFESOR', 'prof2@test.com');
      const curso = await createCourse({
        name: 'Curso 1',
        professorId: profesor2.id,
      });
      await createTask({
        title: 'Tarea 1',
        courseId: curso.id,
      });

      const token = await request(app)
        .post(`/auth/login`)
        .send({ email: profesor.email, password: 'hashed' });

      const res = await request(app)
        .get(`/courses/${curso.id}/tasks`)
        .set('Authorization', `Bearer ${token.body.token}`);

      expect(res.status).toBe(403);
    });

    it('Alumno puede listar tareas de cursos asignados', async () => {
      const profesor = await createUser('PROFESOR', 'prof@test.com');
      const alumno = await createUser('ALUMNO', 'alumno@test.com');
      const curso = await createCourse({
        name: 'Curso 1',
        professorId: profesor.id,
        studentsIds: [alumno.id],
      });
      await createTask({
        title: 'Tarea 1',
        courseId: curso.id,
      });

      const token = await request(app)
        .post(`/auth/login`)
        .send({ email: alumno.email, password: 'hashed' });

      const res = await request(app)
        .get(`/courses/${curso.id}/tasks`)
        .set('Authorization', `Bearer ${token.body.token}`);

      expect(res.status).toBe(200);
      expect(res.body.length).equal(1);
    });

    it('Alumno no puede listar tareas de cursos no asignados', async () => {
      const profesor = await createUser('PROFESOR', 'prof@test.com');
      const alumno = await createUser('ALUMNO', 'alumno@test.com');
      const curso = await createCourse({
        name: 'Curso 1',
        professorId: profesor.id,
      });
      await createTask({
        title: 'Tarea 1',
        courseId: curso.id,
      });

      const token = await request(app)
        .post(`/auth/login`)
        .send({ email: alumno.email, password: 'hashed' });

      const res = await request(app)
        .get(`/courses/${curso.id}/tasks`)
        .set('Authorization', `Bearer ${token.body.token}`);

      expect(res.status).toBe(403);
    });
  });
});
