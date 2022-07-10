import React, { useCallback, useEffect, useRef } from 'react';
import { checkAuthAPI } from './api';
import { useSetRecoilState } from 'recoil';
import { AuthState } from './state';

const App: React.FC = () => {
  const effectRef = useRef<boolean>(false);
  const setAuthState = useSetRecoilState(AuthState);

  const authencitacation = useCallback(async () => {
    const { user } = await checkAuthAPI();
    if (user) {
      setAuthState(user);
    }
  }, []);

  useEffect(() => {
    if (effectRef.current === false) {
      console.log('riun');
      authencitacation();
      return () => {
        effectRef.current = true;
      };
    }
  }, []);

  return <></>;
};

export default App;
