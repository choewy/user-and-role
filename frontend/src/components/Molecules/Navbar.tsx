import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MAX_WIDTH, MIN_WIDTH, NAVBAR_HEIGHT } from '../../constant';

interface NavbarProps {
  authState: AuthState;
  setAuthState: React.Dispatch<AuthState>;
}

const Wrapper = styled.div`
  height: ${NAVBAR_HEIGHT};
  width: 100%;
  min-width: ${MIN_WIDTH};
  max-width: ${MAX_WIDTH};
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  background: rgb(50, 50, 50);
`;

const Menu = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(255, 255, 255);
  cursor: pointer;
  &:hover {
    color: rgba(255, 255, 255, 0.5);
  }
`;

interface ProfileImageProps {
  readonly profileImageUrl: string;
}

const ProfileImage = styled.div<ProfileImageProps>`
  width: 50px;
  height: 50px;
  background-image: ${({ profileImageUrl }) => `url(${profileImageUrl})`};
  background-size: cover;
  border-radius: 50%;
`;

const Navbar: React.FC<NavbarProps> = ({ authState, setAuthState }) => {
  const navigate = useNavigate();
  const handleLoginClick = () => navigate('/login/kakao');

  return (
    <Wrapper>
      <Menu>메뉴 1</Menu>
      <Menu>메뉴 1</Menu>
      <Menu>홈</Menu>
      <Menu>메뉴 1</Menu>
      {authState.isLogin ? (
        <Menu>
          <ProfileImage profileImageUrl={authState.user.profileImageUrl} />
        </Menu>
      ) : (
        <Menu onClick={handleLoginClick}>로그인</Menu>
      )}
    </Wrapper>
  );
};

export default Navbar;
