import { Injectable } from '@nestjs/common';
import { KAKAO } from 'src/app.config';

@Injectable()
export class KakaoApiUrl {
  // 카카오 인증 토큰 발급 API URL
  GET_TOKENS_API_URL(code: string) {
    const host = 'https://kauth.kakao.com';
    const uri = 'oauth/token';
    const queries = [
      `grant_type=authorization_code`,
      `client_id=${KAKAO.clientKey}`,
      `redirect_uri=${KAKAO.loginRedirectURL}`,
      `code=${code}`,
    ].join('&');
    return `${host}/${uri}?${queries}`;
  }

  // 카카오 인증 토큰 갱신 API URL
  REISSUE_TOKENS_API_URL(kakaoRefreshToken: string) {
    const host = 'https://kauth.kakao.com';
    const uri = 'oauth/token';
    const queries = [
      `grant_type=refresh_token`,
      `client_id=${KAKAO.clientKey}`,
      `refresh_token=${kakaoRefreshToken}`,
    ].join('&');
    return `${host}/${uri}?${queries}`;
  }

  // 카카오 계정 조회 API URL
  GET_KAKAO_ID_API_URL() {
    const host = 'https://kapi.kakao.com';
    const uri = 'v1/user/access_token_info';
    return `${host}/${uri}`;
  }

  // 카카오 프로필 조회 API URL
  GET_PROFILE_API_URL(kakaoId: string) {
    const host = 'https://kapi.kakao.com';
    const uri = 'v2/user/me';
    const queries = [
      `target_id_type=user_id`,
      `target_id=${kakaoId}`,
      `secure_resource=${KAKAO.secure}`,
    ].join('&');
    return `${host}/${uri}?${queries}`;
  }
}
