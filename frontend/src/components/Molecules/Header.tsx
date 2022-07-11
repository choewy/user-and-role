import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  HEADER_HEIGHT,
  MAX_WIDTH,
  MIN_WIDTH,
  SITE_URL,
  APP_TITLE,
} from '../../constant';

const Wrapper = styled.div`
  height: ${HEADER_HEIGHT};
  width: 100%;
  min-width: ${MIN_WIDTH};
  max-width: ${MAX_WIDTH};
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  background: rgba(50, 50, 50);
`;
const Null = styled.div`
  width: 20px;
  height: 20px;
  margin: 0 10px;
  padding: 10px;
`;
const Back = styled.div`
  width: 20px;
  height: 20px;
  margin: 0 10px;
  padding: 10px;
  background: rgba(50, 50, 50);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255);
  font-size: 25px;
  border: 1px solid rgba(255, 255, 255);
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    background: rgba(255, 255, 255, 0.25);
  }
`;

const Title = styled.div`
  color: rgb(255, 255, 255);
  font-size: 25px;
  font-weight: bold;
  margin: 0 10px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Header: React.FC = () => {
  const navigate = useNavigate();
  const isMain = window.location.href === SITE_URL;

  const handleBackClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <Wrapper>
      {isMain ? <Null /> : <Back onClick={handleBackClick}>{'<'}</Back>}
      <Title>{APP_TITLE}</Title>
      <Null />
    </Wrapper>
  );
};

export default Header;
