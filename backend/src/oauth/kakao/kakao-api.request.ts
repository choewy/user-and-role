import { Injectable } from '@nestjs/common';
import { KakaoException } from './kakao-api.exception';
import { KakaoProfileDto } from './dto/kakao-profile.dto';
import { KakaoIdDto } from './dto/kakao-id.dto';
import { KakaoTokenDto } from './dto/kakao-token.dto';
import { KAKAO } from 'src/app.config';
import axios from 'axios';

@Injectable()
export class KakaoApiRequest {
  private urls = {
    tokenAPI: 'https://kauth.kakao.com/oauth/token',
    accountAPI: 'https://kapi.kakao.com/v1/user/access_token_info',
    profileAPI: 'https://kapi.kakao.com/v2/user/me',
  };

  constructor(private readonly kakaoException: KakaoException) {}

  // 카카오 로그인 페이지 URL
  kakaoLoginPageUrl() {
    const url = 'https://kauth.kakao.com/oauth/authorize';
    const queries = {
      response_type: 'code',
      client_id: KAKAO.clientKey,
      redirect_uri: KAKAO.loginRedirectURL,
    };
    return `${url}?${Object.entries(queries)
      .map(([key, value]) => `${key}=${value}`)
      .join('&')}`;
  }

  // 카카오 토큰 발급 API
  private async kakaoGetTokenAPI(code: string) {
    const response = await axios({
      method: 'POST',
      url: this.urls.tokenAPI,
      params: {
        grant_type: 'authorization_code',
        client_id: KAKAO.adminKey,
        redirect_uri: KAKAO.loginRedirectURL,
        code,
      },
    })
      .then((res) => res.data)
      .catch((err) => err.response);

    if (response.data as KakaoTokenAPIError) {
      this.kakaoException.serverError();
    }

    return response as KakaoTokenAPIReponse;
  }

  // 카카오 토큰 갱신 API
  private async kakaoReissueTokenAPI(refreshToken: string) {
    const response = await axios({
      method: 'POST',
      url: this.urls.tokenAPI,
      params: {
        grant_type: 'refresh_token',
        client_id: KAKAO.clientKey,
        refresh_token: refreshToken,
      },
    })
      .then((res) => res.data)
      .catch((err) => err.response);

    if (response.data as KakaoTokenAPIError) {
      this.kakaoException.serverError();
    }

    return response as KakaoTokenAPIReponse;
  }

  // 카카오 계정 API
  private async kakaoAccountAPI(accessToken: string) {
    const response = await axios({
      method: 'GET',
      url: this.urls.accountAPI,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.data)
      .catch((err) => err.response);

    if (response.data as KakaoAccountAPIError) {
      this.kakaoException.serverError();
    }

    return response as KakaoAccountAPIResponse;
  }

  // 카카오 프로필 API
  private async kakaoProfileAPI(kakaoId: string) {
    const response = await axios({
      method: 'GET',
      url: this.urls.profileAPI,
      headers: {
        Authorization: `KakaoAK ${KAKAO.adminKey}`,
      },
      params: {
        target_id_type: 'user_id',
        target_id: kakaoId,
        secure_resource: KAKAO.secure,
      },
    })
      .then((res) => res.data)
      .catch((err) => err.response);

    if (response.data as KakaoProfileAPIError) {
      this.kakaoException.serverError();
    }

    return response as KakaoProfileAPIResponse;
  }

  // 카카오 인증 토큰 발급
  async getTokens(code: string) {
    const kakaoTokens = await this.kakaoGetTokenAPI(code);
    return new KakaoTokenDto(kakaoTokens);
  }

  // 카카오 인증 토큰 갱신
  async reissueTokens(refreshToken: string) {
    const kakaoTokens = await this.kakaoReissueTokenAPI(refreshToken);
    const { refresh_token } = kakaoTokens;
    kakaoTokens.refresh_token = refresh_token ? refresh_token : refreshToken;
    return new KakaoTokenDto(kakaoTokens);
  }

  // 카카오 id 확인
  async getKakaoId(accessToken: string) {
    const kakaoAccount = await this.kakaoAccountAPI(accessToken);
    return new KakaoIdDto(kakaoAccount);
  }

  // 카카오 프로필 조회
  async getProfile(kakaoId: string) {
    const kakaoProfile = await this.kakaoProfileAPI(kakaoId);
    return new KakaoProfileDto(kakaoProfile);
  }
}
