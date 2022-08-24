import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exception-filters';
import { EnvConfigInterface, ENV_CONFIG } from './core/environment/environment.config';
import { setupSwaggerConfig } from './core/swagger/swagger.config';

async function bootstrap(): Promise<void> {
  const PREFIX = '/api/v1';

  const app = await NestFactory.create(AppModule);

  const envConfig = app.get(ConfigService).get<EnvConfigInterface>(ENV_CONFIG);

  app.setGlobalPrefix(PREFIX);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // catch all exception and return custom respone

  app.useGlobalFilters(new AllExceptionsFilter(envConfig.nodeEnv));

  setupSwaggerConfig(PREFIX.concat('/docs'), app);

  await app.listen(envConfig.port);
}
bootstrap();
