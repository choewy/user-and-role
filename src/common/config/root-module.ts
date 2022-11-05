import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigToken, envs, TypeOrmConfigType } from './envs';

export const ConfigRootModule = ConfigModule.forRoot({
  isGlobal: true,
  load: envs,
});

export const TypeOrmRootModule = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (configService: ConfigService) =>
    configService.get<TypeOrmConfigType>(ConfigToken.TYPEORM),
});
