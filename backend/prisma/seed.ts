import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Cargando base de datos...');

  const password = await bcrypt.hash('123456', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@instituto.com' },
    update: {},
    create: {
      email: 'admin@instituto.com',
      password,
      role: Role.ADMIN,
    },
  });

  const profesor = await prisma.user.upsert({
    where: { email: 'profesor@instituto.com' },
    update: {},
    create: {
      email: 'profesor@instituto.com',
      password,
      role: Role.PROFESOR,
    },
  });

  const alumno = await prisma.user.upsert({
    where: { email: 'alumno@instituto.com' },
    update: {},
    create: {
      email: 'alumno@instituto.com',
      password,
      role: Role.ALUMNO,
    },
  });

  await prisma.course.upsert({
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

  console.log('✅ Carga de la base de datos completa');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect);
