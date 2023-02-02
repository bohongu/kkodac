import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      skyblue: string;
      harderGreen: string;
      hardGreen: string;
      green: string;
      ivory: string;
    };
    flex: {
      flexCenter: string;
      flexCenterColumn: string;
    };
  }
}
