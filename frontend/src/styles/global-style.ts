import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
  }
  
  body {
    height: 100vh;
    font-family:Neo;
    font-weight: 600;
    background: #f8f9fa;
  }

  button {
    cursor: pointer;
  }

  a { text-decoration: none; color: black;
    &:visited { text-decoration: none; } 
    &:hover { text-decoration: none; }
    &:focus { text-decoration: none; }
    &:hover, a:active { text-decoration: none; }
  }

  
`;
