import React, { useEffect, useRef, useState } from 'react';
import { checkAuthAPI, kakaoGetTokenAPI } from './api';
import { initAuthState } from './state';
import { useLocation, useNavigate } from 'react-router-dom';
import { Header, Navbar } from './components/Molecules';
import { MIN_WIDTH, MAX_WIDTH, NAVBAR_HEIGHT, HEADER_HEIGHT } from './constant';
import { customQuery } from './utils';
import Routers from './Routers';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  min-width: ${MIN_WIDTH};
  max-width: ${MAX_WIDTH};
  height: calc(100% - ${HEADER_HEIGHT} - ${NAVBAR_HEIGHT});
  padding: 10px;
  margin: 0 auto;
  box-sizing: border-box;
`;

const Gap = styled.div`
  height: 80px;
`;

const App: React.FC = () => {
  const loading = useRef<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [authState, setAuthState] = useState<AuthState>(initAuthState);

  useEffect(() => {
    if (loading.current === false) {
      switch (location.pathname) {
        // 토큰 저장
        case '/login/kakao/redirect':
          return () => {
            const queryString = customQuery();
            const { signCode } = queryString;
            kakaoGetTokenAPI(signCode, navigate);
          };
        // 토큰 유효성 검사 및 사용자 정보 불러오기
        default:
          return () => {
            checkAuthAPI(authState, setAuthState);
            loading.current = true;
          };
      }
    }
  }, [location.pathname]);

  return authState.isLogin === null ? (
    <p>로딩중....</p>
  ) : (
    <>
      <Header />
      <Gap />
      <Wrapper className="app">
        <Routers authState={authState} setAuthState={setAuthState} />
      </Wrapper>
      <Navbar authState={authState} setAuthState={setAuthState} />
    </>
  );
};

export default App;
