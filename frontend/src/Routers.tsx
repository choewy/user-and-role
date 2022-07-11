import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { RouteComponent } from './components/Molecules';
import {
  MainPage,
  KakaoLoginPage,
  KakaoRedirectPage,
} from './components/Pages';
import { PAGE_PATH } from './constant';

const Routers: React.FC<GlobalProps> = ({ authState, setAuthState }) => {
  return (
    <Routes>
      <Route
        path={PAGE_PATH.HOME}
        element={<RouteComponent Component={MainPage} authState={authState} />}
      />
      <Route
        path={PAGE_PATH.KAKAO_LOGIN}
        element={
          <RouteComponent
            Component={KakaoLoginPage}
            authState={authState}
            authFlag={false}
          />
        }
      />
      <Route
        path={PAGE_PATH.KAKAO_REDIRECT}
        element={
          <RouteComponent
            Component={KakaoRedirectPage}
            authState={authState}
            setAuthState={setAuthState}
            authFlag={false}
          />
        }
      />
    </Routes>
  );
};

export default Routers;
