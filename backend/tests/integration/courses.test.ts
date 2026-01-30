import { app } from '@/app';
import { prisma } from '@/config/db';
import { createUser } from '../helpers/users';
import { createCourse } from '../helpers/courses';
import request from 'supertest';
import { describe, it, expect } from 'vitest';
import { config } from 'dotenv';

describe('Cursos - roles & propiedad', () => {
  it('Admin puede ver todos los cursos', async () => {
    const admin = await createUser('ADMIN', 'admin@test.com');
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
