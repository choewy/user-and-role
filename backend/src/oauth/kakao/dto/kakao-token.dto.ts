export class KakaoTokenDto {
  tokenType = 'kakao';
  constructor(
    public readonly accessToken: string,
    public readonly refreshToken: string,
  ) {}
}
