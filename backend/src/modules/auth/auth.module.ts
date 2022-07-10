import { Module } from '@nestjs/common';
import { JwtResisger } from 'src/app.util';
import { DatabaseModule } from 'src/database/database.module';
import { UserProvider } from 'src/database/providers/user.provider';
import { AuthRepository } from 'src/database/repositories/auth.repository';
import { KakaoModule } from 'src/guards/kakao/kakao.module';
import { AuthController } from './auth.controller';
import { AuthException } from './auth.exception';
import { AuthService } from './auth.service';
import { KakaoApiRequest } from '../../oauth/kakao/kakao-api.request';
import { KakaoException } from '../../oauth/kakao/kakao-api.exception';

@Module({
  imports: [DatabaseModule, JwtResisger, KakaoModule],
  providers: [
    UserProvider,
    KakaoApiRequest,
    KakaoException,
    AuthRepository,
    AuthService,
    AuthException,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
