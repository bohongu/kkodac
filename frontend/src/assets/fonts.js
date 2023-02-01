import { createGlobalStyle } from 'styled-components';
import Ttangs from './fonts/Ttangs.woff';

export default createGlobalStyle`

    @font-face {
    font-family: 'Ttangs';
    src: local('Ttangs'), url(${Ttangs}) format('woff');
    font-weight: 700;
    font-style: normal;
}

`;
