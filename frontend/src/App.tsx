import Router from './pages/Router';
import GlobalFonts from './assets/fonts';
import { GlobalStyle } from './styles/global-style';
import { useQuery } from 'react-query';
import { getWeather } from './api/api';

const App = () => {
  const lat = 33.511;
  const lon = 126.964;
  const { data } = useQuery('weather', () => getWeather(lat, lon));

  return (
    <>
      <GlobalFonts />
      <GlobalStyle />
      <Router />
    </>
  );
};

export default App;
