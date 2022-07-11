import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { kakaoLoginUrlAPI } from '../../api';

const Wrapper = styled.div`
  width: 100%;
  min-witdh: 200px;
  max-width: 200px;
  background: rgba(249, 224, 0, 1);
  border-radius: 2rem;
`;

const Hover = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border-radius: 2rem;
  &:hover {
    background: rgba(0, 0, 0, 0.2);
  }
`;

const Anchor = styled.a`
  color: rgb(50, 50, 50);
  text-decoration: none;
`;

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

  return (
    <Wrapper>
      <Hover>
        <Anchor href={href}>카카오 로그인</Anchor>
      </Hover>
    </Wrapper>
  );
};

export default KakaoLoginAnchor;
