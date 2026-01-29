import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export async function connectDatabase(): Promise<void> {
  try {
    await prisma.$connect();
    await prisma.$queryRaw`SELECT 1`;
    console.log('✅ Base de Datos conectada');
  } catch (error) {
    console.error('❌ Falló la conexión a la Base de Datos');
    console.error(error);
    process.exit(1);
  }
}
