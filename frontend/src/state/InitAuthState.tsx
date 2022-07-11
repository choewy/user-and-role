declare global {
  interface UserData {
    userId: string;
    kakaoId: string;
    nickname: string;
    profileImageUrl: string;
    thumbnailImageUrl: string;
    role: 0 | 1;
    gender: null | 0 | 1;
    height: null | number;
    weight: null | number;
    createdAt: string;
    updatedAt: string;
  }

  interface AuthState {
    isLogin: null | boolean;
    user: UserData;
  }
}

const initAuthState: AuthState = {
  isLogin: null,
  user: {
    userId: '',
    kakaoId: '',
    nickname: '',
    profileImageUrl: '',
    thumbnailImageUrl: '',
    role: 0,
    gender: null,
    height: null,
    weight: null,
    createdAt: '',
    updatedAt: '',
  },
};

export default initAuthState;
