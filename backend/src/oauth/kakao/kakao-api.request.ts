import { Injectable } from '@nestjs/common';
import { KakaoException } from './kakao-api.exception';
import { KakaoApiUrl } from './kakao-api.url';
import { KAKAO } from 'src/app.config';
import axios from 'axios';

@Injectable()
export class KakaoApiRequest {
  constructor(
    private readonly kakaoApiUrl: KakaoApiUrl,
    private readonly kakaoException: KakaoException,
  ) {}

  // 카카오 인증 토큰 발급
  async getTokens(code: string) {
    const url = this.kakaoApiUrl.GET_TOKENS_API_URL(code);
    const { access_token, refresh_token } = await axios
      .get(url)
      .then((res) => res.data)
      .catch((err) => err.response.data);

    if (!access_token) {
      this.kakaoException.serverError();
    }

    return {
      accessToken: String(access_token),
      refreshToken: String(refresh_token),
    };
  }

  // 카카오 인증 토큰 갱신
  async reissueTokens(kakaoRefreshToken: string) {
    const url = this.kakaoApiUrl.REISSUE_TOKENS_API_URL(kakaoRefreshToken);
    const { access_token, refresh_token } = await axios
      .post(url)
      .then((res) => res.data)
      .catch((err) => err.response.data);

    if (!access_token) {
      this.kakaoException.serverError();
    }

    const refreshToken = refresh_token ? refresh_token : kakaoRefreshToken;

    return {
      accessToken: String(access_token),
      refreshToken: String(refreshToken),
    };
  }

  // 카카오 id 확인
  async getKakaoId(kakaoAccessToken: string) {
    const url = this.kakaoApiUrl.GET_KAKAO_ID_API_URL();
    const headers = { Authorization: `Bearer ${kakaoAccessToken}` };
    const { id } = await axios
      .get(url, { headers })
      .then((res) => res.data)
      .catch((err) => err.response.data);

    if (!id) {
      this.kakaoException.serverError();
    }

    return {
      kakaoId: String(id),
    };
  }

  // 카카오 프로필 조회
  async getProfile(kakaoId: string) {
    const url = this.kakaoApiUrl.GET_PROFILE_API_URL(kakaoId);
    const headers = { Authorization: `KakaoAK ${KAKAO.adminKey}` };
    const { properties } = await axios
      .get(url, { headers })
      .then((res) => res.data)
      .catch((err) => err.response.data);

    if (!properties) {
      this.kakaoException.serverError();
    }

    console.log(properties);

    return {
      nickname: String(properties.nickname),
      profileImageUrl: String(properties.profile_image),
      thumbnailImageUrl: String(properties.thumbnail_image),
    };
  }
}
