import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigToken, TypeOrmConfigType } from '../config';

export const TypeOrmRootModule = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (configService: ConfigService) =>
    configService.get<TypeOrmConfigType>(ConfigToken.TYPEORM),
});
