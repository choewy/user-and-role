import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { readFileSync } from 'fs';
import { ConfigEnvKey, ConfigToken } from './constants';
import { parseEnvToJSON } from './helpers';
import { TypeormEnv } from './interfaces';

export default registerAs(ConfigToken.Typeorm, (): TypeOrmModuleOptions => {
  const TYPEORM_ENV = parseEnvToJSON<TypeormEnv>(ConfigEnvKey.Typeorm);
  return {
    type: TYPEORM_ENV.TYPE,
    host: TYPEORM_ENV.HOST,
    port: TYPEORM_ENV.PORT,
    username: TYPEORM_ENV.USERNAME,
    password: TYPEORM_ENV.PASSWORD,
    database: TYPEORM_ENV.DATABASE,
    synchronize: TYPEORM_ENV.SYNCHRONIZE,
    logging: TYPEORM_ENV.LOGGING,
    entities: TYPEORM_ENV.ENTITIES,
    migrations: TYPEORM_ENV.MIGRATIONS,
    timezone: TYPEORM_ENV.TIMEZONE,
    ssl: {
      require: TYPEORM_ENV.SSL_REQUIRED,
      rejectUnauthorized: TYPEORM_ENV.SSL_REJECT_UNAUTHORIZED,
      ca:
        TYPEORM_ENV.SSL_CERTIFICATE_PATH &&
        readFileSync(TYPEORM_ENV.SSL_CERTIFICATE_PATH).toString(),
    },
  };
});
