import { customAxios } from '../utils';

const axiosConfig = {
  method: 'GET',
  url: '/auth',
};

const checkAuthAPI = () => customAxios({ ...axiosConfig });

export default checkAuthAPI;
