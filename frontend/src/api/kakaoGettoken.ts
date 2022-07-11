import { NavigateFunction } from 'react-router-dom';
import { customAxios, customCookie } from '../utils';

const axiosConfig = {
  method: 'POST',
  url: '/auth/kakao/token',
};

const kakaoGetTokenAPI = async (
  signCode: string,
  navigate: NavigateFunction,
) => {
  const credentials = await customAxios({ ...axiosConfig, data: { signCode } });

  if (!credentials.kakaoId) {
    alert('Kakao Credentials Error');
    return navigate(-1);
  }

  if (customCookie.setKakaoCredentials(credentials)) {
    window.location.replace('/');
  }
};

export default kakaoGetTokenAPI;
