import { app } from './app';
import { connectDatabase } from './config/db';
import { env } from './config/env';

async function bootstrap() {
  await connectDatabase();

  app.listen(env.PORT, () => {
    console.log(`🚀 Backend escuchando en ${env.BACKEND_URL}`);
  });
}

bootstrap();
