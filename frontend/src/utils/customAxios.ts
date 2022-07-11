import axios, { AxiosRequestConfig } from 'axios';
import { BASE_URL } from '../constant';
import customCookie from './customCookie';

const customAxios = async (config: AxiosRequestConfig) => {
  const headers = customCookie.getCredentials();
  const request = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers,
  });

  return request(config)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

export default customAxios;
