import request from 'supertest';
import { app } from '@/app';
import { describe, it, expect } from 'vitest';

describe.skip('Auth - Registro', () => {
  it('Debería registra un usuario', async () => {
    const res = await request(app).post('/auth/register').send({
      email: 'admin@test.com',
      password: '123456',
      role: 'ADMIN',
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.email).toBe('admin@test.com');
  });

  it('Debería indicar correo duplicado', async () => {
    await request(app).post('/auth/register').send({
      email: 'admin@test.com',
      password: '123456',
      role: 'admin',
    });

    const res = await request(app).post('/auth/register').send({
      email: 'admin@test.com',
      password: '123456',
      role: 'admin',
    });

    expect(res.status).toBe(400);
  });
});
