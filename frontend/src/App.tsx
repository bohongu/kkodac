import Router from './pages/Router';
import GlobalFonts from './assets/fonts';
import { GlobalStyle } from './styles/global-style';
import { useEffect } from 'react';
import { profile, refresh } from './api/api';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { accessToken, currentUser, loggedInState } from './recoil/atoms';
import { useQuery } from 'react-query';

const App = () => {
  const token = localStorage.getItem('token');
  const [currentAccessToken, setAccessToken] = useRecoilState(accessToken);
  const loginState = useSetRecoilState(loggedInState);
  const [user, setUser] = useRecoilState(currentUser);

  const { data } = useQuery(['refresh', token], () => refresh(token + ''), {
    enabled: !!token,
  });
  const { data: profileData } = useQuery(
    ['profile', accessToken],
    () => profile(currentAccessToken),
    {
      enabled: !!currentAccessToken,
    },
  );

  useEffect(() => {
    const refresh = () => {
      if (token) {
        setAccessToken(data?.data.result);
        if (profileData) {
          setUser(profileData.data.result);
        }
        loginState(true);
      } else {
        loginState(false);
      }
    };

    refresh();
  }, [data, loginState, profileData, setAccessToken, setUser, token]);

  return (
    <>
      <GlobalFonts />
      <GlobalStyle />
      <Router />
    </>
  );
};

export default App;
