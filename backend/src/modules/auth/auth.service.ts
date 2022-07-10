import { Injectable } from '@nestjs/common';
import { AuthRepository } from 'src/database/repositories/auth.repository';
import { AuthException } from './auth.exception';
import { KakaoApiRequest } from '../../oauth/kakao/kakao-api.request';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly authException: AuthException,
    private readonly kakaoApiRequest: KakaoApiRequest,
    private readonly jwtService: JwtService,
  ) {}

  // 카카오 code로 로그인 or 회원가입 처리
  async signWithKakao(code: string) {
    const kakaoTokens = await this.kakaoApiRequest.getTokens(code);
    const { accessToken } = kakaoTokens;

    const kakaoAccount = await this.kakaoApiRequest.getKakaoId(accessToken);
    const { kakaoId } = kakaoAccount;

    const user = await this.authRepository.selectWithKakaoId(kakaoId);
    const { userId } = user
      ? user
      : await this.authRepository.createWithKakaoId(kakaoId);

    const signCode = this.jwtService.sign({ kakaoTokens, kakaoId });
    await this.authRepository.updateSignCode(userId, signCode);

    return signCode;
  }

  // 카카오 토큰 반환
  async getKakaoTokenWithSignCode(signCode: string) {
    const user = await this.authRepository.selectWithSignCode(signCode);

    if (!user) {
      this.authException.unauthorized();
    }

    await this.authRepository.deleteSignCode(user.userId);
    const { kakaoTokens } = this.jwtService.decode(
      signCode,
    ) as SignCodeWithKakaoPayload;

    return {
      tokenType: 'kakao',
      tokens: kakaoTokens,
    };
  }

  // 카카오 프로필 조회
  async getKakaoProfile(kakaoId: string) {
    const kakaoProfile = await this.kakaoApiRequest.getProfile(kakaoId);
    const user = await this.authRepository.selectWithKakaoId(kakaoId);
    return { user: { ...user, ...kakaoProfile } };
  }
}
