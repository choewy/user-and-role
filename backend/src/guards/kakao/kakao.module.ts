import { Module } from '@nestjs/common';
import { JwtResisger } from 'src/app.util';
import { DatabaseModule } from 'src/database/database.module';
import { KakaoApiModule } from 'src/oauth/kakao/kakao-api.module';
import { KakaoGuard } from './kakao.guard';

@Module({
  imports: [DatabaseModule, JwtResisger, KakaoApiModule],
  providers: [KakaoGuard],
  exports: [],
})
export class KakaoModule {}
