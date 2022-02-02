import { INestApplication } from '@nestjs/common';
import helmet from 'helmet';

export const setupSecurity = (app: INestApplication) => {
  app.use(helmet());
};
