import express from 'express';
import cors from 'cors';
import { authRouter } from './modules/auth/auth.routes';
import courseRoutes from './modules/courses/course.routes';
import { errorHandler } from './middlewares/error.middleware';
import { userRouter } from './modules/user/user.routes';

export const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/courses', courseRoutes);

app.get('/', (_req, res) => {
  res.json({
    status: 'ok',
    message: 'Backend running',
  });
});

app.use(errorHandler);
