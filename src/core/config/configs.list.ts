import { ConfigFactory } from '@nestjs/config';
import { DatabaseConfig } from '../database/database.config';
import { envConfig } from '../environment/environment.config';
import { JWTConfig } from '../jwt/jwt.config';

type ConfigFactoryReturnValue = Record<string, any> | Promise<Record<string, any>>;

export const configs: ConfigFactory<ConfigFactoryReturnValue>[] = [
  envConfig,
  DatabaseConfig,
  JWTConfig,
];
