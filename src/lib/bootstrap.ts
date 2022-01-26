import { INestApplication, LogLevel, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';

export function getLogLevels(isProduction: boolean): LogLevel[] {
  if (isProduction) {
    return ['log', 'warn', 'error'];
  }
  return ['error', 'warn', 'log', 'verbose', 'debug'];
}

export function setupSecurity(app: INestApplication) {
  if (process.env.NODE_ENV !== 'production') {
    app.enableCors();
  }
  app.use(helmet());
}

export function setupPipes(app: INestApplication) {
  app.useGlobalPipes(new ValidationPipe());
}

export async function start(app: INestApplication) {
  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');
  await app.listen(port);
}
