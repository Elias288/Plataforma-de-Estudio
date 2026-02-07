import { app } from '@/app';
import { prisma } from '@/config/db';
import { createUser } from '../helpers/users';
import { createCourse } from '../helpers/courses';
import request from 'supertest';
import { describe, it, expect } from 'vitest';

describe('Cursos - roles & propiedad', () => {
  it('Admin puede ver todos los cursos', async () => {
    const admin = await createUser('ADMIN', 'admin2@test.com');
    const profesor = await createUser('PROFESOR', 'prof@test.com');

    await createCourse({ name: 'Curso 1', professorId: profesor.id });
    await createCourse({ name: 'Curso 2', professorId: profesor.id });

    const token = await request(app)
      .post(`/auth/login`)
      .send({ email: admin.email, password: 'hashed' });

    const res = await request(app)
      .get('/courses')
      .set('Authorization', `Bearer ${token.body.token}`);

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(2);
  });

  it('Profesores solo pueden ver sus cursos', async () => {
    const profesor1 = await createUser('PROFESOR', 'p1@test.com');
    const profesor2 = await createUser('PROFESOR', 'p2@test.com');

    await createCourse({ name: 'Curso P1', professorId: profesor1.id });
    await createCourse({ name: 'Curso P2', professorId: profesor2.id });

    const login = await request(app)
      .post('/auth/login')
      .send({ email: profesor1.email, password: 'hashed' });

    const res = await request(app)
      .get('/courses')
      .set('Authorization', `Bearer ${login.body.token}`);

    expect(res.body).toHaveLength(1);
    expect(res.body[0].name).toBe('Curso P1');
  });

  it('Estudiantes solo pueden ver sus cursos asignados', async () => {
    const alumno = await createUser('ALUMNO', 'alumno@test.com');
    const profesor = await createUser('PROFESOR', 'prof@test.com');

    const course = await createCourse({
      name: 'Curso Visible',
      professorId: profesor.id,
    });

    await prisma.course.update({
      where: { id: course.id },
      data: {
        students: {
          connect: { id: alumno.id },
        },
      },
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

  it('Los estudiantes no pueden crear cursos', async () => {
    const alumno = await createUser('ALUMNO', 'alumno@test.com');

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

describe('Cursos - agregar y quitar alumnos', () => {
  /* Agregar Alumnos a curso: solo admins (a cualquier curso) y profesores (a sus cursos) */
  it('Admin puede agregar alumno a cualquier curso', async () => {
    const admin = await createUser('ADMIN', 'admin@test.com');
    const profesor = await createUser('PROFESOR', 'prof@test.com');
    const alumno = await createUser('ALUMNO', 'alumno@test.com');

    const course = await createCourse({
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
    // expect(res.body.length).toBe(2);
  });

  it('Profesor puede agregar alumno a sus cursos', async () => {
    const profesor = await createUser('PROFESOR', 'prof@test.com');
    const alumno = await createUser('ALUMNO', 'alumno@test.com');

    const course = await createCourse({
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
    // expect(res.body.length).toBe(2);
  });

  it('Profesor no puede agregar alumno a otros cursos', async () => {
    const profesor = await createUser('PROFESOR', 'prof@test.com');
    const profesor2 = await createUser('PROFESOR', 'prof2@test.com');
    const alumno = await createUser('ALUMNO', 'alumno@test.com');

    const course = await createCourse({
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
    // expect(res.body.length).toBe(2);
  });

  it('Alumno no puede agregar alumno a cursos', async () => {
    const profesor = await createUser('PROFESOR', 'prof@test.com');
    const alumno = await createUser('ALUMNO', 'alumno@test.com');

    const course = await createCourse({
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
    const admin = await createUser('ADMIN', 'admin@test.com');
    const profesor = await createUser('PROFESOR', 'prof@test.com');
    const alumno1 = await createUser('ALUMNO', 'alumno1@test.com');
    const alumno2 = await createUser('ALUMNO', 'alumno2@test.com');

    const course = await createCourse({
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
    const profesor = await createUser('PROFESOR', 'prof@test.com');
    const alumno1 = await createUser('ALUMNO', 'alumno1@test.com');
    const alumno2 = await createUser('ALUMNO', 'alumno2@test.com');

    const course = await createCourse({
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
    const profesor = await createUser('PROFESOR', 'prof@test.com');
    const profesor2 = await createUser('PROFESOR', 'prof2@test.com');
    const alumno1 = await createUser('ALUMNO', 'alumno1@test.com');
    const alumno2 = await createUser('ALUMNO', 'alumno2@test.com');

    const course = await createCourse({
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
    const profesor = await createUser('PROFESOR', 'prof@test.com');
    const alumno1 = await createUser('ALUMNO', 'alumno1@test.com');
    const alumno2 = await createUser('ALUMNO', 'alumno2@test.com');

    const course = await createCourse({
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
