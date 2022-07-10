import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { kakaoLoginUrlAPI } from '../../api';

const Anchor = styled.a``;

const KakaoLoginAnchor: React.FC = () => {
  const effectRef = useRef(false);
  const [href, setHref] = useState<string>('');

  const getKakaoLoginUrl = useCallback(async () => {
    const { url } = await kakaoLoginUrlAPI();

    if (!url) {
      return alert('Server Error!');
    }

    setHref(url);
  }, []);

  useEffect(() => {
    if (effectRef.current === false) {
      getKakaoLoginUrl();

      return () => {
        effectRef.current = true;
      };
    }
  }, []);

  return <Anchor href={href}>카카오 로그인</Anchor>;
};

export default KakaoLoginAnchor;
