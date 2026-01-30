import { prisma } from '@/config/db';
import { config } from 'dotenv';
config({ path: '.env.test' });

beforeEach(async () => {
  await prisma.submission.deleteMany();
  await prisma.task.deleteMany();
  await prisma.course.deleteMany();
  await prisma.user.deleteMany();
});
