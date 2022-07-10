declare global {
  interface SignCode {
    userId: string;
  }
  interface KakaoTokens {
    tokenType: 'kakao';
    accessToken: string;
    refreshToken: string;
  }
  interface SignCodeWithKakaoPayload {
    kakaoId: string;
    kakaoTokens: KakaoTokens;
  }
}

export {};
