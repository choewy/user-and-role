import { registerAs } from '@nestjs/config';
import { ConfigEnvKey, ConfigToken } from './constants';
import { parseEnvToJSON } from './helpers';
import { SwaggerConfig, SwaggerEnv } from './interfaces';

export default registerAs(ConfigToken.Swagger, (): SwaggerConfig => {
  const SWAGGER_ENV = parseEnvToJSON<SwaggerEnv>(ConfigEnvKey.Swagger);
  return {
    version: SWAGGER_ENV.VERSION,
    path: SWAGGER_ENV.PATH,
    title: SWAGGER_ENV.TITLE,
    description: SWAGGER_ENV.DESCRIPTION,
    name: SWAGGER_ENV.SITE_NAME,
    url: SWAGGER_ENV.SITE_URL,
    email: SWAGGER_ENV.EMAIL,
    authorization: SWAGGER_ENV.AUTHORIZATION,
  };
});
