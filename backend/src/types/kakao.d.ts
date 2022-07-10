declare global {
  interface KakaoTokenAPIError {
    error: string;
    error_description: string;
    error_code: string;
  }

  interface KakaoAccountAPIError {
    msg: string;
    code: number;
  }

  interface KakaoProfileAPIError {
    msg: string;
    code: number;
  }

  interface KakaoTokenAPIReponse {
    access_token: string;
    refresh_token: string;
  }

  interface KakaoAccountAPIResponse {
    id: number;
  }

  interface KakaoProfileAPIResponse {
    id: number;
    properties: {
      nickname: string;
      profile_image: string;
      thumbnail_image: string;
    };
    kakao_account: {
      profile_nickname_needs_agreement: boolean;
      profile_image_needs_agreement: boolean;
      profile: {
        nickname: string;
        thumbnail_image_url: string;
        profile_image_url: string;
        is_default_image: boolean;
      };
    };
  }
}

export {};
