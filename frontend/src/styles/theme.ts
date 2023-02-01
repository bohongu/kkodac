import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  colors: {
    lime: '#e9fac8',
    lime3: '#c0eb75',
    green: '#7ca244',
    orange: '#fbbe72',
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
