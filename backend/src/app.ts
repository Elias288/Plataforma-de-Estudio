import express from 'express';
import cors from 'cors';
import { authRouter } from './modules/auth/auth.routes';

export const app = express();

app.use(cors());
app.use(express.json());
app.use('/auth', authRouter);

app.get('/', (_req, res) => {
  res.json({
    status: 'ok',
    message: 'Backend running',
  });
});
