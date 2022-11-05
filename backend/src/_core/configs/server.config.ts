import { registerAs } from '@nestjs/config';
import { ConfigEnvKey, ConfigToken } from './constants';
import { parseEnvToJSON } from './helpers';
import { ServerConfig, ServerEnv } from './interfaces';

export default registerAs(ConfigToken.Server, (): ServerConfig => {
  const SERVER_ENV = parseEnvToJSON<ServerEnv>(ConfigEnvKey.Server);
  return {
    port: SERVER_ENV.PORT,
    host: SERVER_ENV.HOST,
    limit: SERVER_ENV.LIMIT,
  };
});
