import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigToken } from '../configs/constants';

export const CoreTypeormModule = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    return configService.get<TypeOrmModuleOptions>(ConfigToken.Typeorm);
  },
});
