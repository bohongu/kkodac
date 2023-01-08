import Router from './pages/Router';
import GlobalFonts from './assets/fonts';
import { GlobalStyle } from './styles/global-style';

const App = () => {
  return (
    <>
      <GlobalFonts />
      <GlobalStyle />
      <Router />
    </>
  );
};

export default App;
