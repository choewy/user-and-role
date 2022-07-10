import { Module } from '@nestjs/common';
import { KakaoApiRequest } from './kakao-api.request';
import { KakaoException } from './kakao-api.exception';

@Module({
  providers: [KakaoApiRequest, KakaoException],
  exports: [KakaoException, KakaoApiRequest],
})
export class KakaoApiModule {}
