import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

import { DevLogger } from './logger/dev.logger';
import { JsonLogger } from './logger/json.logger';
import { TskvLogger } from './logger/tskv.logger';

function getLogger() {
  switch (process.env.LOGGER_TYPE) {
    case 'dev':
      return new DevLogger();
    case 'json':
      return new JsonLogger();
    case 'tskv':
      return new TskvLogger();
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.setGlobalPrefix('api/afisha');
  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.useLogger(getLogger());

  await app.listen(3000, '0.0.0.0');
}
bootstrap();
