import { Gender, PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Cargando base de datos...');

  const password = await bcrypt.hash('123456', 10);

  await prisma.user.upsert({
    where: { email: 'admin@instituto.com' },
    update: {},
    create: {
      email: 'admin@instituto.com',
      password,
      name: 'admin',
      role: Role.ADMIN,
    },
  });

  const profesor = await prisma.user.upsert({
    where: { email: 'profesor@instituto.com' },
    update: {},
    create: {
      email: 'profesor@instituto.com',
      password,
      name: 'profesor',
      role: Role.PROFESOR,
    },
  });

  const profesor2 = await prisma.user.upsert({
    where: { email: 'profesor2@instituto.com' },
    update: {},
    create: {
      email: 'profesor2@instituto.com',
      password,
      name: 'profesor2',
      role: Role.PROFESOR,
    },
  });

  const alumno = await prisma.user.upsert({
    where: { email: 'alumno@instituto.com' },
    update: {},
    create: {
      email: 'alumno@instituto.com',
      name: 'alumno',
      password,
      role: Role.ALUMNO,
    },
  });

  const alumno2 = await prisma.user.upsert({
    where: { email: 'alumno2@instituto.com' },
    update: {},
    create: {
      email: 'alumno2@instituto.com',
      name: 'alumno2',
      password,
      role: Role.ALUMNO,
    },
  });

  const curso = await prisma.course.upsert({
    where: { name: 'Backend I' },
    update: {},
    create: {
      name: 'Backend I',
      description: 'Curso inicial de backend con Node.js',
      professorId: profesor.id,
      students: {
        connect: [{ id: alumno.id }],
      },
    },
  });

  const curso2 = await prisma.course.upsert({
    where: { name: 'Backend II' },
    update: {},
    create: {
      name: 'Backend II',
      description: 'Curso de backend con Node.js',
      professorId: profesor2.id,
      students: {
        connect: [{ id: alumno.id }],
      },
    },
  });

  await prisma.task.upsert({
    where: { title: 'Tarea 1' },
    update: {},
    create: {
      title: 'Tarea 1',
      description: 'Descripción de la tarea 1',
      courseId: curso.id,
    },
  });

  await prisma.task.upsert({
    where: { title: 'Tarea 2' },
    update: {},
    create: {
      title: 'Tarea 2',
      description: 'Descripción de la tarea 2',
      courseId: curso.id,
      dueDate: new Date(),
    },
  });

  console.log('✅ Carga de la base de datos completa');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect);
