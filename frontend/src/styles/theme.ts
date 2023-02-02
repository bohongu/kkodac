import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  colors: {
    skyblue: '#7CD0FD',
    harderGreen: '#379237',
    hardGreen: '#54B435',
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
