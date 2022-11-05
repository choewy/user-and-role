import { registerAs } from '@nestjs/config';
import { ConfigToken } from './enums';
import { TypeOrmConfigType } from './types';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DateTime } from 'luxon';
import { existsSync, readFileSync } from 'fs';

export default registerAs(
  ConfigToken.TYPEORM,
  (): TypeOrmConfigType => ({
    type: process.env.TYPEORM_TYPE as any,
    host: process.env.TYPEORM_HOST,
    port: parseInt(process.env.TYPEORM_PORT, 10),
    database: process.env.TYPEORM_DATABASE,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
    logging: process.env.TYPEORM_LOGGING === 'true',
    entities: process.env.TYPEORM_ENTITIES.split('|'),
    migrations: process.env.TYPEORM_MIGRATIONS.split('|'),
    timezone: process.env.TYPEORM_TIMEZONE,
    autoLoadEntities: process.env.TYPEORM_AUTO_LOAD_ENTITIES === 'true',
    namingStrategy: new SnakeNamingStrategy(),
    ssl: existsSync(process.env.TYPEORM_CA_PATH)
      ? {
          required: true,
          rejectUnauthorized: true,
          ca: readFileSync(process.env.TYPEORM_CA_PATH).toString(),
        }
      : undefined,
    extra: {
      typeCast: (
        field: {
          type: string;
          string: () => string;
        },
        next: () => void,
      ) => {
        const { type } = field;

        if (type === 'DATE') {
          const val = field.string();
          return val === null
            ? null
            : DateTime.fromFormat(val.split('.')[0], 'yyyy-MM-dd');
        }

        if (type === 'DATETIME') {
          const val = field.string();
          return val === null
            ? null
            : DateTime.fromFormat(val.split('.')[0], 'yyyy-MM-dd HH:mm:ss');
        }

        return next();
      },
    },
  }),
);
