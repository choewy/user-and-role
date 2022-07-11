import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MAX_WIDTH, MIN_WIDTH, NAVBAR_HEIGHT } from '../../constant';
import { initCurrentAnchorState } from '../../state';

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

interface MenuProps {
  current: boolean;
}

const Menu = styled.div<MenuProps>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) =>
    props.current ? 'rgb(255, 255, 255)' : 'rgba(255, 255, 255, 0.5)'};
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

const Navbar: React.FC<NavbarProps> = ({ authState }) => {
  const loading = useRef(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [currentAnchorState, setCurrentAnchorState] =
    useState<CurrentAnchorState>(initCurrentAnchorState);

  // TODO : location.pathname same checking logic
  useEffect(() => {
    if (loading.current === false) {
      return () => {
        loading.current = true;
      };
    }
  }, [location.pathname]);

  const handleHomeClick = () => navigate('/');
  const handleLoginClick = () => navigate('/login/kakao/');

  return (
    <Wrapper>
      <Menu current={location.pathname === '/'} onClick={handleHomeClick}>
        홈
      </Menu>
      <Menu current={location.pathname === '/menu'}>메뉴 1</Menu>
      <Menu current={location.pathname === '/menu'}>메뉴 1</Menu>
      {authState.isLogin ? (
        <Menu current={location.pathname === '/'}>
          <ProfileImage profileImageUrl={authState.user.profileImageUrl} />
        </Menu>
      ) : (
        <Menu
          current={location.pathname === '/login/kakao'}
          onClick={handleLoginClick}
        >
          로그인
        </Menu>
      )}
    </Wrapper>
  );
};

export default Navbar;
