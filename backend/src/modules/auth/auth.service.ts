import { Injectable } from '@nestjs/common';
import { AuthRepository } from 'src/database/repositories/auth.repository';
import { KAKAO } from 'src/app.config';
import { JwtService } from '@nestjs/jwt';
import { CreateTokenDto } from './dto/create-token.dto';
import axios from 'axios';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  private getKakaoTokenApiUrl(code: string) {
    const host = 'https://kauth.kakao.com';
    const uri = 'oauth/token';
    const queries = {
      grant_type: 'authorization_code',
      client_id: KAKAO.clientKey,
      redirect_uri: KAKAO.loginRedirectURL,
      code,
    };
    const queryString = Object.entries(queries)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
    return `${host}/${uri}?${queryString}`;
  }

  private getKakaoUserApiUrl() {
    const host = 'https://kapi.kakao.com';
    const uri = 'v1/user/access_token_info';
    return `${host}/${uri}`;
  }

  async signWithKakao(code: string) {
    const { access_token } = await axios
      .get(this.getKakaoTokenApiUrl(code))
      .then((res) => res.data)
      .catch((err) => err.response.data);

    if (!access_token) {
      throw { statusCode: 500 };
    }

    const headers = { Authorization: `Bearer ${access_token}` };
    const { id } = await axios
      .get(this.getKakaoUserApiUrl(), { headers })
      .then((res) => res.data)
      .catch((err) => err.response.data);

    if (!id) {
      throw { statusCode: 500 };
    }

    const alreadyExist = await this.authRepository.selectWithKakaoId(id);
    const { userId } = alreadyExist
      ? alreadyExist
      : await this.authRepository.createWithKakaoId(id);

    const signCode = this.jwtService.sign({ userId });
    this.authRepository.updateSignCode(userId, signCode);
    return signCode;
  }

  async createTokenWithSignCode(createTokenDto: CreateTokenDto) {
    const { signCode } = createTokenDto;
    const user = await this.authRepository.selectWithSignCode(signCode);

    if (!user) {
      throw { statusCode: 404 };
    }

    await this.authRepository.deleteSignCode(user.userId);

    return {
      accessToken: this.jwtService.sign(
        {
          userId: user.userId,
          role: user.role,
        },
        { expiresIn: '10s' },
      ),
      refreshToken: this.jwtService.sign(
        { userId: user.userId },
        { expiresIn: '20d' },
      ),
    };
  }
}
