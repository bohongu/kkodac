import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  colors: {
    skyblue: '#7CD0FD',
    green: '#C6D868',
    ivory: '#FEFEE4',
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
