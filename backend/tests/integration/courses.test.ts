import { app } from '@/app';
import { createUser } from '../helpers/users';
import { createCourse } from '../helpers/courses';
import request from 'supertest';
import { describe, it, expect } from 'vitest';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('Cursos - roles & propiedad', () => {
  describe('GET Courses', () => {
    it('Admin puede ver todos los cursos', async () => {
      const admin = await createUser(prisma, 'ADMIN', 'admin@test.com');
      const profesor = await createUser(prisma, 'PROFESOR', 'prof@test.com');

      await createCourse({
        prisma,
        name: 'Curso 1',
        professorId: profesor.id,
      });
      await createCourse({
        prisma,
        name: 'Curso 2',
        professorId: profesor.id,
      });

      const token = await request(app)
        .post(`/auth/login`)
        .send({ email: admin.email, password: 'hashed' });

      const res = await request(app)
        .get('/courses')
        .set('Authorization', `Bearer ${token.body.token}`);

      expect(res.status).toBe(200);
      expect(res.body.length).greaterThanOrEqual(2);
    });

    it('Profesores solo pueden ver sus cursos', async () => {
      const profesor1 = await createUser(prisma, 'PROFESOR', 'prof@test.com');
      const profesor2 = await createUser(prisma, 'PROFESOR', 'prof2@test.com');

      await createCourse({
        prisma,
        name: 'Curso 1',
        professorId: profesor1.id,
      });
      await createCourse({
        prisma,
        name: 'Curso 2',
        professorId: profesor2.id,
      });

      const login = await request(app)
        .post('/auth/login')
        .send({ email: profesor1.email, password: 'hashed' });

      const res = await request(app)
        .get('/courses')
        .set('Authorization', `Bearer ${login.body.token}`);

      expect(res.body).toHaveLength(1);
      expect(res.body[0].name).toBe('Curso 1');
    });

    it('Estudiantes solo pueden ver sus cursos asignados', async () => {
      const alumno = await createUser(prisma, 'ALUMNO', 'alumno@test.com');
      const profesor = await createUser(prisma, 'PROFESOR', 'prof@test.com');

      const course = await createCourse({
        prisma,
        name: 'Curso 1',
        professorId: profesor.id,
        studentsIds: [alumno.id],
      });

      const login = await request(app)
        .post('/auth/login')
        .send({ email: alumno.email, password: 'hashed' });

      const res = await request(app)
        .get('/courses')
        .set('Authorization', `Bearer ${login.body.token}`);

      expect(res.body).toHaveLength(1);
      expect(res.body[0].id).toBe(course.id);
    });
  });

  describe('POST Courses', () => {
    it('Admin pueden crear cursos', async () => {
      const admin = await createUser(prisma, 'ADMIN', 'admin@test.com');
      const prof = await createUser(prisma, 'PROFESOR', 'prof@test.com');

      const login = await request(app)
        .post('/auth/login')
        .send({ email: admin.email, password: 'hashed' });

      const res = await request(app)
        .post('/courses')
        .set('Authorization', `Bearer ${login.body.token}`)
        .send({
          name: 'Curso 1',
          description: 'Descripción de prueba válida',
          professorId: prof.id,
        });

      expect(res.status).toBe(201);
      expect(res.body.name).equal('Curso 1');
    });

    it('Los estudiantes no pueden crear cursos', async () => {
      const alumno = await createUser(prisma, 'ALUMNO', 'alumno@test.com');

      const login = await request(app)
        .post('/auth/login')
        .send({ email: alumno.email, password: 'hashed' });

      const res = await request(app)
        .post('/courses')
        .set('Authorization', `Bearer ${login.body.token}`)
        .send({ name: 'Curso ilegal' });

      expect(res.status).toBe(403);
    });
  });

  describe('PUT Courses', () => {
    /* Agregar Alumnos a curso: solo admins (a cualquier curso) y profesores (a sus cursos) */
    it('Admin puede agregar alumno a cualquier curso', async () => {
      const admin = await createUser(prisma, 'ADMIN', 'admin@test.com');
      const profesor = await createUser(prisma, 'PROFESOR', 'prof@test.com');
      const alumno = await createUser(prisma, 'ALUMNO', 'alumno@test.com');

      const course = await createCourse({
        prisma,
        name: 'Curso 1',
        professorId: profesor.id,
      });

      const adminToken = await request(app)
        .post(`/auth/login`)
        .send({ email: admin.email, password: 'hashed' });

      const res = await request(app)
        .put(`/courses/${course.id}/addStudents`)
        .set('Authorization', `Bearer ${adminToken.body.token}`)
        .send({ students: [`${alumno.id}`] });

      expect(res.status).toBe(200);
    });

    it('Profesor puede agregar alumno a sus cursos', async () => {
      const profesor = await createUser(prisma, 'PROFESOR', 'prof@test.com');
      const alumno = await createUser(
        prisma,

        'ALUMNO',
        'alumno@test.com',
      );

      const course = await createCourse({
        prisma,
        name: 'Curso 1',
        professorId: profesor.id,
      });

      const token = await request(app)
        .post(`/auth/login`)
        .send({ email: profesor.email, password: 'hashed' });

      const res = await request(app)
        .put(`/courses/${course.id}/addStudents`)
        .set('Authorization', `Bearer ${token.body.token}`)
        .send({ students: [`${alumno.id}`] });

      expect(res.status).toBe(200);
    });

    it('Profesor no puede agregar alumno a otros cursos', async () => {
      const profesor = await createUser(prisma, 'PROFESOR', 'prof@test.com');
      const profesor2 = await createUser(prisma, 'PROFESOR', 'prof2@test.com');
      const alumno = await createUser(prisma, 'ALUMNO', 'alumno@test.com');

      const course = await createCourse({
        prisma,
        name: 'Curso 1',
        professorId: profesor.id,
      });

      const profesor2Token = await request(app)
        .post(`/auth/login`)
        .send({ email: profesor2.email, password: 'hashed' });

      const res = await request(app)
        .put(`/courses/${course.id}/addStudents`)
        .set('Authorization', `Bearer ${profesor2Token.body.token}`)
        .send({ students: [`${alumno.id}`] });
      console.log(res.body);

      expect(res.status).toBe(403);
    });

    it('Alumno no puede agregar alumno a cursos', async () => {
      const profesor = await createUser(prisma, 'PROFESOR', 'prof@test.com');
      const alumno = await createUser(prisma, 'ALUMNO', 'alumno@test.com');

      const course = await createCourse({
        prisma,
        name: 'Curso 1',
        professorId: profesor.id,
      });

      const token = await request(app)
        .post(`/auth/login`)
        .send({ email: alumno.email, password: 'hashed' });

      const res = await request(app)
        .put(`/courses/${course.id}/addStudents`)
        .set('Authorization', `Bearer ${token.body.token}`)
        .send({ students: [`${alumno.id}`] });

      expect(res.status).toBe(403);
      // expect(res.body.length).toBe(2);
    });

    /* Quitar alumnos de curso: solo admins o profesores */
    it('Admin puede quitar alumno de curso', async () => {
      const admin = await createUser(prisma, 'ADMIN', 'admin@test.com');
      const profesor = await createUser(prisma, 'PROFESOR', 'prof@test.com');
      const alumno1 = await createUser(prisma, 'ALUMNO', 'alumno1@test.com');
      const alumno2 = await createUser(prisma, 'ALUMNO', 'alumno2@test.com');

      const course = await createCourse({
        prisma,
        name: 'Curso 1',
        professorId: profesor.id,
        studentsIds: [alumno1.id, alumno2.id],
      });

      const adminToken = await request(app)
        .post(`/auth/login`)
        .send({ email: admin.email, password: 'hashed' });

      const res = await request(app)
        .put(`/courses/${course.id}/removeStudents`)
        .set('Authorization', `Bearer ${adminToken.body.token}`)
        .send({ students: [`${alumno1.id}`] });

      expect(res.status).toBe(200);
    });

    it('Profesor puede quitar alumno de curso', async () => {
      const profesor = await createUser(prisma, 'PROFESOR', 'prof@test.com');
      const alumno1 = await createUser(prisma, 'ALUMNO', 'alumno1@test.com');
      const alumno2 = await createUser(prisma, 'ALUMNO', 'alumno2@test.com');

      const course = await createCourse({
        prisma,
        name: 'Curso 1',
        professorId: profesor.id,
        studentsIds: [alumno1.id, alumno2.id],
      });

      const token = await request(app)
        .post(`/auth/login`)
        .send({ email: profesor.email, password: 'hashed' });

      const res = await request(app)
        .put(`/courses/${course.id}/removeStudents`)
        .set('Authorization', `Bearer ${token.body.token}`)
        .send({ students: [`${alumno1.id}`] });

      expect(res.status).toBe(200);
    });

    it('Profesor no puede quitar alumno de otros cursos', async () => {
      const profesor = await createUser(prisma, 'PROFESOR', 'prof@test.com');
      const profesor2 = await createUser(prisma, 'PROFESOR', 'prof2@test.com');
      const alumno1 = await createUser(prisma, 'ALUMNO', 'alumno1@test.com');
      const alumno2 = await createUser(prisma, 'ALUMNO', 'alumno2@test.com');

      const course = await createCourse({
        prisma,
        name: 'Curso 1',
        professorId: profesor.id,
        studentsIds: [alumno1.id, alumno2.id],
      });

      const token = await request(app)
        .post(`/auth/login`)
        .send({ email: profesor2.email, password: 'hashed' });

      const res = await request(app)
        .put(`/courses/${course.id}/removeStudents`)
        .set('Authorization', `Bearer ${token.body.token}`)
        .send({ students: [`${alumno1.id}`] });

      expect(res.status).toBe(403);
    });

    it('Alumno puede quitar alumno de curso', async () => {
      const profesor = await createUser(prisma, 'PROFESOR', 'prof@test.com');
      const alumno1 = await createUser(prisma, 'ALUMNO', 'alumno1@test.com');
      const alumno2 = await createUser(prisma, 'ALUMNO', 'alumno2@test.com');

      const course = await createCourse({
        prisma,
        name: 'Curso 1',
        professorId: profesor.id,
        studentsIds: [alumno1.id, alumno2.id],
      });

      const token = await request(app)
        .post(`/auth/login`)
        .send({ email: alumno2.email, password: 'hashed' });

      const res = await request(app)
        .put(`/courses/${course.id}/removeStudents`)
        .set('Authorization', `Bearer ${token.body.token}`)
        .send({ students: [`${alumno1.id}`] });

      expect(res.status).toBe(403);
    });
  });
});
