import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const start = (app: INestApplication) => {
  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');

  return app.listen(port);
};
