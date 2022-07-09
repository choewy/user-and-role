import { Module } from '@nestjs/common';
import { KakaoApiUrl } from './kakao-api.url';
import { KakaoApiRequest } from './kakao-api.request';
import { KakaoException } from './kakao-api.exception';

@Module({
  providers: [KakaoApiUrl, KakaoApiRequest, KakaoException],
  exports: [KakaoApiUrl, KakaoException, KakaoApiRequest],
})
export class KakaoApiModule {}
