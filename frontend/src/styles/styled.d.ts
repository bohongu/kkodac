import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      skyblue: string;
      harderGreen: string;
      hardGreen: string;
      green: string;
      ivory: string;
      hardGray: string;
      gray: string;
      red: string;
    };
    flex: {
      flexCenter: string;
      flexCenterColumn: string;
    };
  }
}
