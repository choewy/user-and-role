import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { kakaoLoginUrl } from '../../api';
import { customAxios } from '../../utils';

const AnchorWrapper = styled.div`
  min-width: 200px;
  min-width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background: red;
`;

const Anchor = styled.a``;

const KakaoLoginAnchor: React.FC = () => {
  const effectRef = useRef(false);
  const [href, setHref] = useState<string>('');

  const getKakaoLoginUrl = useCallback(async () => {
    const res = await customAxios(kakaoLoginUrl());
    console.log(res);
    const { url } = await customAxios(kakaoLoginUrl());
    console.log(url);

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

  return (
    <AnchorWrapper>
      <Anchor href={href}>카카오 로그인</Anchor>
    </AnchorWrapper>
  );
};

export default KakaoLoginAnchor;
