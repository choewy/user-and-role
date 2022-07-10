import React, { useCallback, useRef } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { kakaoGetTokenAPI } from '../../api';
import { customCookie } from '../../utils';

const KakaoRedirectPage: React.FC = () => {
  const navigate = useNavigate();
  const effectRef = useRef(false);
  const signCode = String(
    new URL(window.location.href).searchParams.get('signCode'),
  );

  const getKakaoCredentials = useCallback(async () => {
    const credentials = await kakaoGetTokenAPI(signCode);

    if (!credentials.kakaoId) {
      navigate(-1);
      return alert('Kakao Credentials Error');
    }

    customCookie.setKakaoCredentials(credentials);
    navigate('/');
  }, []);

  useEffect(() => {
    if (effectRef.current === false) {
      getKakaoCredentials();

      return () => {
        effectRef.current = true;
      };
    }
  }, []);

  return <></>;
};

export default KakaoRedirectPage;
