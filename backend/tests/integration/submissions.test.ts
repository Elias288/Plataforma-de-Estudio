import { app } from '@/app';
import { createUser } from '../helpers/users';
import { createCourse } from '../helpers/courses';
import request from 'supertest';
import { describe, it, expect } from 'vitest';
import { createTask } from '../helpers/tasks';
import { loginUser } from '../helpers/auth';
import { PrismaClient } from '@prisma/client';
import { createSubmission } from '../helpers/submissions';

const prisma = new PrismaClient();

describe('Submissions', () => {
  describe('GET Submissions', () => {
    it('Admin puede listar entregas de cualquier curso', async () => {
      const admin = await createUser(prisma, 'ADMIN', 'admin@test.com');
      const profesor = await createUser(prisma, 'PROFESOR', 'prof@test.com');
      const alumno = await createUser(prisma, 'ALUMNO', 'alumno@test.com');
      const alumno2 = await createUser(prisma, 'ALUMNO', 'alumno2@test.com');
      const curso = await createCourse({
        prisma,
        name: 'Curso 1',
        professorId: profesor.id,
      });
      const task = await createTask({
        prisma,
        title: 'Tarea 1 - curso 1',
        courseId: curso.id,
        dueDate: new Date('02-25-2026'),
      });
      await createSubmission({
        prisma,
        taskId: task.id,
        studentId: alumno.id,
      });
      await createSubmission({
        prisma,
        taskId: task.id,
        studentId: alumno2.id,
      });

      const token = await loginUser(admin.email, 'hashed');

      const res = await request(app)
        .get(`/courses/${curso.id}/submissions`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
    });

    it('Admin puede listar entregas de cualquier tarea de cualquier curso', async () => {
      const admin = await createUser(prisma, 'ADMIN', 'admin@test.com');
      const profesor = await createUser(prisma, 'PROFESOR', 'prof@test.com');
      const alumno = await createUser(prisma, 'ALUMNO', 'alumno@test.com');
      const curso = await createCourse({
        prisma,
        name: 'Curso 1',
        professorId: profesor.id,
      });
      const task = await createTask({
        prisma,
        title: 'Tarea 1 - curso 1',
        courseId: curso.id,
        dueDate: new Date('02-25-2026'),
      });
      await createSubmission({
        prisma,
        taskId: task.id,
        studentId: alumno.id,
      });

      const token = await loginUser(admin.email, 'hashed');

      const res = await request(app)
        .get(`/courses/${curso.id}/tasks/${task.id}/submissions`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
    });

    it('Profesor puede listar entregas de sus curso', async () => {
      const profesor = await createUser(prisma, 'PROFESOR', 'prof@test.com');
      const alumno = await createUser(prisma, 'ALUMNO', 'alumno@test.com');
      const alumno2 = await createUser(prisma, 'ALUMNO', 'alumno2@test.com');
      const curso = await createCourse({
        prisma,
        name: 'Curso 1',
        professorId: profesor.id,
      });
      const task = await createTask({
        prisma,
        title: 'Tarea 1 - curso 1',
        courseId: curso.id,
        dueDate: new Date('02-25-2026'),
      });
      await createSubmission({
        prisma,
        taskId: task.id,
        studentId: alumno.id,
      });
      await createSubmission({
        prisma,
        taskId: task.id,
        studentId: alumno2.id,
      });

      const token = await loginUser(profesor.email, 'hashed');

      const res = await request(app)
        .get(`/courses/${curso.id}/submissions`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
    });

    it('Profesor puede listar entregas de tareas de sus curso', async () => {
      const alumno = await createUser(prisma, 'ALUMNO', 'alumno@test.com');
      const profesor = await createUser(prisma, 'PROFESOR', 'prof@test.com');
      const curso = await createCourse({
        prisma,
        name: 'Curso 1',
        professorId: profesor.id,
      });
      const task = await createTask({
        prisma,
        title: 'Tarea 1',
        courseId: curso.id,
        dueDate: new Date('02-25-2026'),
      });
      await createSubmission({
        prisma,
        studentId: alumno.id,
        taskId: task.id,
      });

      const token = await loginUser(profesor.email, 'hashed');

      const res = await request(app)
        .get(`/courses/${curso.id}/tasks/${task.id}/submissions`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
    });

    it('Profesor no puede listar entregas de sus curso', async () => {
      const profesor = await createUser(prisma, 'PROFESOR', 'prof@test.com');
      const profesor2 = await createUser(prisma, 'PROFESOR', 'prof2@test.com');
      const alumno = await createUser(prisma, 'ALUMNO', 'alumno@test.com');
      const curso = await createCourse({
        prisma,
        name: 'Curso 1',
        professorId: profesor.id,
      });
      const task = await createTask({
        prisma,
        title: 'Tarea 1 - curso 1',
        courseId: curso.id,
        dueDate: new Date('02-25-2026'),
      });
      await createSubmission({
        prisma,
        taskId: task.id,
        studentId: alumno.id,
      });

      const token = await loginUser(profesor2.email, 'hashed');

      const res = await request(app)
        .get(`/courses/${curso.id}/submissions`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(403);
    });

    it('Profesor no puede listar entregas de tareas de otros cursos', async () => {
      const profesor = await createUser(prisma, 'PROFESOR', 'prof@test.com');
      const profesor2 = await createUser(prisma, 'PROFESOR', 'prof2@test.com');
      const student = await createUser(prisma, 'ALUMNO', 'alumno@test.com');
      const curso = await createCourse({
        prisma,
        name: 'Curso 1',
        professorId: profesor2.id,
      });
      const task = await createTask({
        prisma,
        title: 'Tarea 1',
        courseId: curso.id,
      });

      await createSubmission({
        prisma,
        taskId: task.id,
        studentId: student.id,
      });

      const token = await loginUser(profesor.email, 'hashed');

      const res = await request(app)
        .get(`/courses/${curso.id}/tasks/${task.id}/submissions`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(403);
    });

    it('Alumno puede listar sus entregas de sus curso', async () => {
      const profesor = await createUser(prisma, 'PROFESOR', 'prof@test.com');
      const alumno = await createUser(prisma, 'ALUMNO', 'alumno@test.com');
      const alumno2 = await createUser(prisma, 'ALUMNO', 'alumno2@test.com');
      const curso = await createCourse({
        prisma,
        name: 'Curso 1',
        professorId: profesor.id,
      });
      const task = await createTask({
        prisma,
        title: 'Tarea 1 - curso 1',
        courseId: curso.id,
        dueDate: new Date('02-25-2026'),
      });
      await createSubmission({
        prisma,
        taskId: task.id,
        studentId: alumno.id,
      });
      await createSubmission({
        prisma,
        taskId: task.id,
        studentId: alumno2.id,
      });

      const token = await loginUser(alumno.email, 'hashed');

      const res = await request(app)
        .get(`/courses/${curso.id}/submissions`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
    });

    it('Alumno puede listar sus entregas de una tarea', async () => {
      const profesor = await createUser(prisma, 'PROFESOR', 'prof@test.com');
      const alumno = await createUser(prisma, 'ALUMNO', 'alumno@test.com');
      const curso = await createCourse({
        prisma,
        name: 'Curso 1',
        professorId: profesor.id,
        studentsIds: [alumno.id],
      });
      const task = await createTask({
        prisma,
        title: 'Tarea 1',
        courseId: curso.id,
      });
      await createSubmission({
        prisma,
        studentId: alumno.id,
        taskId: task.id,
      });

      const token = await loginUser(alumno.email, 'hashed');

      const res = await request(app)
        .get(`/courses/${curso.id}/tasks/${task.id}/submissions`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.length).equal(1);
    });

    it('Alumno no puede listar entregas de otros', async () => {
      const profesor = await createUser(prisma, 'PROFESOR', 'prof@test.com');
      const alumno = await createUser(prisma, 'ALUMNO', 'alumno@test.com');
      const alumno2 = await createUser(prisma, 'ALUMNO', 'alumno2@test.com');
      const curso = await createCourse({
        prisma,
        name: 'Curso 1',
        professorId: profesor.id,
      });
      const task = await createTask({
        prisma,
        title: 'Tarea 1',
        courseId: curso.id,
      });
      await createSubmission({
        prisma,
        studentId: alumno.id,
        taskId: task.id,
      });
      await createSubmission({
        prisma,
        studentId: alumno2.id,
        taskId: task.id,
      });

      const token = await loginUser(alumno.email, 'hashed');

      const res = await request(app)
        .get(`/courses/${curso.id}/tasks/${task.id}/submissions`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.length).equal(1);
    });
  });

  describe('POST Submission', () => {
    it('Alumno puede realizar una entrega', async () => {
      const profesor = await createUser(prisma, 'PROFESOR', 'prof@test.com');
      const alumno = await createUser(prisma, 'ALUMNO', 'alumno@test.com');
      const curso = await createCourse({
        prisma,
        name: 'Curso 1',
        professorId: profesor.id,
        studentsIds: [alumno.id],
      });

      const task = await createTask({
        prisma,
        title: 'Tarea 1 - curso 1',
        courseId: curso.id,
        dueDate: new Date('02-25-2026'),
      });

      const token = await loginUser(alumno.email, 'hashed');

      const res = await request(app)
        .post(`/courses/${curso.id}/tasks/${task.id}/submissions`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          description: 'entrega 1',
          repoUrl: 'https://google.com',
        });

      expect(res.status).toBe(201);
      expect(res.body.description).equal('entrega 1');
    });

    it('Admin no puede realizar una entrega', async () => {
      const profesor = await createUser(prisma, 'PROFESOR', 'prof@test.com');
      const admin = await createUser(prisma, 'ADMIN', 'admin@test.com');
      const curso = await createCourse({
        prisma,
        name: 'Curso 1',
        professorId: profesor.id,
      });

      const task = await createTask({
        prisma,
        title: 'Tarea 1 - curso 1',
        courseId: curso.id,
        dueDate: new Date('02-25-2026'),
      });

      const token = await loginUser(admin.email, 'hashed');

      const res = await request(app)
        .post(`/courses/${curso.id}/tasks/${task.id}/submissions`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          description: 'entrega 1',
          repoUrl: 'https://google.com',
        });

      expect(res.status).toBe(403);
    });

    it('Profesor no puede realizar una entrega', async () => {
      const profesor = await createUser(prisma, 'PROFESOR', 'prof@test.com');
      const curso = await createCourse({
        prisma,
        name: 'Curso 1',
        professorId: profesor.id,
      });

      const task = await createTask({
        prisma,
        title: 'Tarea 1 - curso 1',
        courseId: curso.id,
        dueDate: new Date('02-25-2026'),
      });

      const token = await loginUser(profesor.email, 'hashed');

      const res = await request(app)
        .post(`/courses/${curso.id}/tasks/${task.id}/submissions`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          description: 'entrega 1',
          repoUrl: 'https://google.com',
        });

      expect(res.status).toBe(403);
    });

    it('Alumno no puede realizar una entrega a un curso no asignado', async () => {
      const profesor = await createUser(prisma, 'PROFESOR', 'prof@test.com');
      const alumno1 = await createUser(prisma, 'ALUMNO', 'alumno1@test.com');
      const alumno2 = await createUser(prisma, 'ALUMNO', 'alumno2@test.com');
      const curso = await createCourse({
        prisma,
        name: 'Curso 1',
        professorId: profesor.id,
        studentsIds: [alumno1.id],
      });

      const task = await createTask({
        prisma,
        title: 'Tarea 1 - curso 1',
        courseId: curso.id,
        dueDate: new Date('02-25-2026'),
      });

      const token = await loginUser(alumno2.email, 'hashed');

      const res = await request(app)
        .post(`/courses/${curso.id}/tasks/${task.id}/submissions`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          description: 'entrega 1',
          repoUrl: 'https://google.com',
        });

      expect(res.status).toBe(403);
    });
  });

  describe('PATCH Submission', () => {
    it('Profesor puede calificar entrega', async () => {
      const profesor = await createUser(prisma, 'PROFESOR', 'prof@test.com');
      const alumno = await createUser(prisma, 'ALUMNO', 'alumno@test.com');
      const curso = await createCourse({
        prisma,
        name: 'Curso 1',
        professorId: profesor.id,
        studentsIds: [alumno.id],
      });
      const task = await createTask({
        prisma,
        title: 'Tarea 1 - curso 1',
        courseId: curso.id,
        dueDate: new Date('02-25-2026'),
      });
      const submission = await createSubmission({
        prisma,
        taskId: task.id,
        studentId: alumno.id,
      });

      const token = await loginUser(profesor.email, 'hashed');

      const res = await request(app)
        .patch(
          `/courses/${curso.id}/tasks/${task.id}/submissions/${submission.id}/grade`,
        )
        .set('Authorization', `Bearer ${token}`)
        .send({
          grade: 10,
          feedback: 'Respuesta de calificación',
        });

      expect(res.status).toBe(200);
      expect(res.body.feedback).equals('Respuesta de calificación');
    });

    it('Admin no puede calificar entrega', async () => {
      const admin = await createUser(prisma, 'ADMIN', 'admin@test.com');
      const profesor = await createUser(prisma, 'PROFESOR', 'prof@test.com');
      const alumno = await createUser(prisma, 'ALUMNO', 'alumno@test.com');
      const curso = await createCourse({
        prisma,
        name: 'Curso 1',
        professorId: profesor.id,
        studentsIds: [alumno.id],
      });
      const task = await createTask({
        prisma,
        title: 'Tarea 1 - curso 1',
        courseId: curso.id,
        dueDate: new Date('02-25-2026'),
      });
      const submission = await createSubmission({
        prisma,
        taskId: task.id,
        studentId: alumno.id,
      });

      const token = await loginUser(admin.email, 'hashed');

      const res = await request(app)
        .patch(
          `/courses/${curso.id}/tasks/${task.id}/submissions/${submission.id}/grade`,
        )
        .set('Authorization', `Bearer ${token}`)
        .send({
          grade: 10,
          feedback: 'Respuesta de calificación',
        });

      expect(res.status).toBe(403);
    });

    it('Alumno no puede calificar entrega', async () => {
      const profesor = await createUser(prisma, 'PROFESOR', 'prof@test.com');
      const alumno = await createUser(prisma, 'ALUMNO', 'alumno@test.com');
      const curso = await createCourse({
        prisma,
        name: 'Curso 1',
        professorId: profesor.id,
        studentsIds: [alumno.id],
      });
      const task = await createTask({
        prisma,
        title: 'Tarea 1 - curso 1',
        courseId: curso.id,
        dueDate: new Date('02-25-2026'),
      });
      const submission = await createSubmission({
        prisma,
        taskId: task.id,
        studentId: alumno.id,
      });

      const token = await loginUser(alumno.email, 'hashed');

      const res = await request(app)
        .patch(
          `/courses/${curso.id}/tasks/${task.id}/submissions/${submission.id}/grade`,
        )
        .set('Authorization', `Bearer ${token}`)
        .send({
          grade: 10,
          feedback: 'Respuesta de calificación',
        });

      expect(res.status).toBe(403);
    });
  });
});
