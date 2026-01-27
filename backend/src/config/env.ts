import 'dotenv/config';

export const env = {
  PORT: process.env.PORT || 3000,
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://postgres:postgres@db:5432/institute',
  BACKEND_URL: process.env.BACKEND_URL || `http://backend:${process.env.PORT || 3000}`,
  JWT_SECRET: process.env.JWT_SECRET || 'super_secret-key',
};
