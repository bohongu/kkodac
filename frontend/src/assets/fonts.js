import { createGlobalStyle } from 'styled-components';
import Ttangs from './fonts/Ttangs.woff';
import Syong from './fonts/Syong.woff';
import Neo from './fonts/Neo.woff';

export default createGlobalStyle`

    @font-face {
        font-family: 'Ttangs';
        src: local('Ttangs'), url(${Ttangs}) format('woff');
        font-weight: 700;
        font-style: normal;
    }

    @font-face {
        font-family: 'Syong';
        src: local('Syong'), url(${Syong}) format('woff');
        font-weight: normal;
        font-style: normal;
    }

    @font-face {
    font-family: 'Neo';
    src: local('Neo'), url(${Neo}) format('woff');
    font-weight: normal;
    font-style: normal;
}

    

`;
