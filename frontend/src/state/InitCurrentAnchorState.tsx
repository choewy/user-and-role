interface AnchorState {
  pathname: string;
  current: boolean;
}

declare global {
  interface CurrentAnchorState {
    home: AnchorState;
    menu1: AnchorState;
    menu2: AnchorState;
    me: AnchorState;
    login: AnchorState;
  }
}

const initCurrentAnchorState: CurrentAnchorState = {
  home: {
    pathname: '/',
    current: false,
  },
  menu1: {
    pathname: '/menu1',
    current: false,
  },
  menu2: {
    pathname: '/menu2',
    current: false,
  },
  me: {
    pathname: '/me',
    current: false,
  },
  login: {
    pathname: '/login/kakao',
    current: false,
  },
};

export default initCurrentAnchorState;
