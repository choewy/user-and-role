import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import {
  HomePage,
  ShimmerPage,
  KakaoLoginPage,
  KakaoRedirectPage,
} from './components/Pages';
import { PAGE_PATH } from './constant';
import { AuthState } from './state';

const Routers: React.FC = () => {
  const [authState, _] = useRecoilState(AuthState);
  console.log(authState);
  return (
    <BrowserRouter>
      <Suspense fallback={<ShimmerPage />}>
        <Routes>
          <Route path={PAGE_PATH.HOME} element={<HomePage />} />
          <Route path={PAGE_PATH.KAKAO_LOGIN} element={<KakaoLoginPage />} />
          <Route
            path={PAGE_PATH.KAKAO_REDIRECT}
            element={<KakaoRedirectPage />}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routers;
