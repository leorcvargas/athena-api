import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { start } from './lib/bootstrap/start';
import { setupSecurity } from './lib/bootstrap/setupSecurity';
import { setupPipes } from './lib/bootstrap/setupPipes';
import { getLogLevels } from './lib/bootstrap/getLogLevels';
import { setupCookies } from './lib/bootstrap/setupCookies';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: getLogLevels(process.env.NODE_ENV === 'production'),
  });

  setupSecurity(app);
  setupPipes(app);
  setupCookies(app);

  await start(app);
}
bootstrap();
