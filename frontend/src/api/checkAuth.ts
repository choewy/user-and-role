import { Dispatch } from 'react';
import { customAxios } from '../utils';

const axiosConfig = {
  method: 'GET',
  url: '/auth',
};

const checkAuthAPI = async (
  authState: AuthState,
  setAuthState: Dispatch<AuthState>,
) => {
  const { user } = await customAxios({ ...axiosConfig });
  if (user) {
    setAuthState({ user, isLogin: true });
  } else {
    setAuthState({ ...authState, isLogin: false });
  }
};

export default checkAuthAPI;
