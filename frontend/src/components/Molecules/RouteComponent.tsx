import React from 'react';
import { Navigate } from 'react-router-dom';

declare global {
  interface GlobalProps {
    authState: AuthState;
    setAuthState?: React.Dispatch<AuthState>;
  }
}

interface RouterProps extends GlobalProps {
  Component: React.FC<GlobalProps>;
  authFlag?: boolean;
}

const RouteComponent: React.FC<RouterProps> = ({
  Component,
  authFlag,
  authState,
  setAuthState,
}): React.ReactElement => {
  // 회원만 접근 가능
  if (authFlag === true) {
    if (authFlag === authState.isLogin) {
      return <Component authState={authState} setAuthState={setAuthState} />;
    }
    return <Navigate to="/login/kakao" />;
  }

  // 비회원만 접근 가능
  if (authFlag === false) {
    if (authFlag === authState.isLogin) {
      return <Component authState={authState} setAuthState={setAuthState} />;
    }
    return <Navigate to="/" />;
  }

  // 전체 접근 가능
  return <Component authState={authState} setAuthState={setAuthState} />;
};

export default RouteComponent;
