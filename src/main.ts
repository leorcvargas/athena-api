import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import {
  getLogLevels,
  setupPipes,
  setupSecurity,
  start,
} from './lib/bootstrap';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: getLogLevels(process.env.NODE_ENV === 'production'),
  });
  setupSecurity(app);
  setupPipes(app);

  await start(app);
}
bootstrap();
