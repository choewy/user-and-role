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

  // 카카오 인증 토큰 발급
  async getTokens(code: string) {
    const { access_token, refresh_token } = await axios({
      method: 'GET',
      url: this.urls.tokenAPI,
      params: {
        grant_type: 'authorization_code',
        client_id: KAKAO.clientKey,
        redirect_uri: KAKAO.loginRedirectURL,
        code,
      },
    })
      .then((res) => res.data)
      .catch((err) => err.response.data);

    if (!access_token) {
      this.kakaoException.serverError();
    }

    return new KakaoTokenDto(access_token, refresh_token);
  }

  // 카카오 인증 토큰 갱신
  async reissueTokens(kakaoRefreshToken: string) {
    const { access_token, refresh_token } = await axios({
      method: 'POST',
      url: this.urls.tokenAPI,
      params: {
        grant_type: 'refresh_token',
        client_id: KAKAO.clientKey,
        refresh_token: kakaoRefreshToken,
      },
    })
      .then((res) => res.data)
      .catch((err) => err.response.data);

    if (!access_token) {
      this.kakaoException.serverError();
    }

    return new KakaoTokenDto(
      access_token,
      refresh_token ? refresh_token : kakaoRefreshToken,
    );
  }

  // 카카오 id 확인
  async getKakaoId(kakaoAccessToken: string) {
    const { id } = await axios({
      method: 'GET',
      url: this.urls.accountAPI,
      headers: {
        Authorization: `Bearer ${kakaoAccessToken}`,
      },
    })
      .then((res) => res.data)
      .catch((err) => err.response.data);

    if (!id) {
      this.kakaoException.serverError();
    }

    return new KakaoIdDto(String(id));
  }

  // 카카오 프로필 조회
  async getProfile(kakaoId: string) {
    const { properties } = await axios({
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
      .catch((err) => err.response.data);

    if (!properties) {
      this.kakaoException.serverError();
    }

    return new KakaoProfileDto(
      properties.nickname,
      properties.profile_image,
      properties.thumbnail_image,
    );
  }
}
