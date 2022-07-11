import React from 'react';
import styled from 'styled-components';
import KakaoLoginAnchor from '../Molecules/KakaoAnchor';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Top = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 20px;
`;

const Title = styled.h1`
  width: 100%;
  font-size: 20px;
  text-align: center;
  margin: 0;
`;

const SubTitle = styled.h2`
  width: 100%;
  font-size: 16px;
  font-weight: 400;
  text-align: center;
  margin: 0;
`;

const KakaoLoginPage: React.FC = () => {
  return (
    <Wrapper>
      <Top>
        <Title>카카오 계정으로 로그인하기</Title>
        <SubTitle>간단하게 로그인하고 서비스를 이용해보세요!</SubTitle>
      </Top>
      <KakaoLoginAnchor />
    </Wrapper>
  );
};

export default KakaoLoginPage;
