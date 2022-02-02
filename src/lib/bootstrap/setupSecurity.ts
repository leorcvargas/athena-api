import { INestApplication } from '@nestjs/common';
import helmet from 'helmet';

export const setupSecurity = (app: INestApplication) => {
  if (process.env.NODE_ENV !== 'production') {
    app.enableCors();
  }

  app.use(helmet());
};
