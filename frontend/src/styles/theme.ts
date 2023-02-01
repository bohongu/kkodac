import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  colors: {
    lime: '#e9fac8', //lime1
    lime3: '#c0eb75', //lime3
    green: '#37b24d', //green8
  },
  flex: {
    flexCenter: `
    display: flex;
    justify-content: center;
    align-items: center;
  `,
    flexCenterColumn: `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  },
};
