import { customAxios } from '../utils';

const axiosConfig = {
  method: 'POST',
  url: '/auth/kakao/token',
};

const kakaoGetTokenAPI = (signCode: string) => {
  return customAxios({ ...axiosConfig, data: { signCode } });
};

export default kakaoGetTokenAPI;
