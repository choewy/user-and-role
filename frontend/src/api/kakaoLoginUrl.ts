import { customAxios } from '../utils';

const axiosConfig = {
  method: 'GET',
  url: '/auth/kakao',
};

const kakaoLoginUrlAPI = () => {
  return customAxios({ ...axiosConfig });
};

export default kakaoLoginUrlAPI;
