import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  colors: {
    textColor: 'black',
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
