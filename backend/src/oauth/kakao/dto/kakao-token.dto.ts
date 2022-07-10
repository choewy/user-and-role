export class KakaoTokenDto {
  tokenType = 'kakao';
  accessToken: string;
  refreshToken: string;
  constructor(kakaoTokens: KakaoTokenAPIReponse) {
    const { access_token, refresh_token } = kakaoTokens;
    this.accessToken = access_token;
    this.refreshToken = refresh_token;
  }
}
