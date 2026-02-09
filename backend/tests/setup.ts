import { prisma } from '@/config/db';
import { config } from 'dotenv';
config({ path: '.env.test' });

beforeEach(async () => {
  await prisma.$transaction([
    prisma.submission.deleteMany(),
    prisma.task.deleteMany(),
    prisma.course.deleteMany(),
    prisma.user.deleteMany(),
  ]);
});

afterAll(async () => {
  await prisma.$disconnect();
});
