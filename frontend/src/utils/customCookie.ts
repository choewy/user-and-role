import { Cookies } from 'react-cookie';

interface Credentials {
  kakaoId: string;
  kakaoTokens: {
    tokenType: string;
    accessToken: string;
    refreshToken: string;
  };
}

const cookie = new Cookies();
const options = { path: '/' };

const customCookie = {
  getCredentials: () => {
    return {
      TokenType: cookie.get('tokenType'),
      Authorization: `Bearer ${cookie.get('accessToken')}`,
    };
  },
  setKakaoCredentials: (credentials: Credentials) => {
    const { kakaoTokens } = credentials;
    cookie.set('tokenType', kakaoTokens.tokenType, options);
    cookie.set('accessToken', kakaoTokens.accessToken, options);
    cookie.set('refreshToken', kakaoTokens.refreshToken, options);
  },
};

export default customCookie;
