declare global {
  interface SignCode {
    userId: string;
  }
  interface KakaoTokens {
    accessToken: string;
    refreshToken: string;
  }
  interface SignCodeWithKakaoPayload {
    kakaoTokens: KakaoTokens;
  }
}

export {};
