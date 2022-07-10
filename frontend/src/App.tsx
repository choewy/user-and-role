import React, { useCallback, useEffect, useRef, useState } from 'react';
import { checkAuthAPI } from './api';
import Routers from './Routers';

const App: React.FC = () => {
  const effectRef = useRef<boolean>(false);
  const [authState, setAuthState] = useState();

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

  return <Routers authState={authState} />;
};

export default App;
