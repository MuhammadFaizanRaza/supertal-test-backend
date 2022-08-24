import * as Joi from 'joi';
import { EnvConfigEnum } from '../environment/environment.config';

export interface ConfigVariableInterface {
  JWT_SECRET: string;
  JWT_EXPIRES_IN: number;
  TYPEORM_CONNECTION: string;
  TYPEORM_DATABASE: string;
  TYPEORM_HOST: string;
  TYPEORM_LOGGING: boolean;
  TYPEORM_PASSWORD: string;
  TYPEORM_PORT: number;
  TYPEORM_SYNCHRONIZE: boolean;
  TYPEORM_USERNAME: string;
  NODE_ENV: EnvConfigEnum;
  PORT: number;
}

const validationSchema = Joi.object<ConfigVariableInterface>({
  //* JWT Config
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.number().required(),

  //* TypeORM Config
  TYPEORM_CONNECTION: Joi.string().required(),
  TYPEORM_DATABASE: Joi.string().required(),
  TYPEORM_HOST: Joi.string().required(),
  TYPEORM_LOGGING: Joi.boolean().required(),
  TYPEORM_PASSWORD: Joi.optional(),
  TYPEORM_PORT: Joi.number().required(),
  TYPEORM_SYNCHRONIZE: Joi.boolean().required(),
  TYPEORM_USERNAME: Joi.string().required(),
  // * Node Env Config
  NODE_ENV: Joi.string()
    .allow(...Object.values(EnvConfigEnum))
    .required(),
  PORT: Joi.number().default(3000).required(),
});
export { validationSchema };
