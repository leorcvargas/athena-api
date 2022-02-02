import { INestApplication } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

export const setupCookies = (app: INestApplication) => {
  app.use(cookieParser());
};
