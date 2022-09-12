import { registerAs } from '@nestjs/config';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigEnvKey, ConfigTokenKey } from './constants';
import { parseEnvToJSON } from './helpers';
import { CorsEnv } from './interfaces';

export default registerAs(ConfigTokenKey.Cors, (): CorsOptions => {
  const CORS_ENV = parseEnvToJSON<CorsEnv>(ConfigEnvKey.Cors);
  return {
    origin: CORS_ENV.ORIGINS.map((regexp) => new RegExp(regexp)),
    methods: CORS_ENV.METHODS,
    allowedHeaders: CORS_ENV.ALLOWED_HEADERS,
    exposedHeaders: CORS_ENV.EXPOSED_HEADERS,
    preflightContinue: CORS_ENV.PREFLIGHT_CONTINUE,
    credentials: CORS_ENV.CREDENTIALS,
  };
});
