import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      skyblue: string;
      green: string;
      ivory: string;
    };
    flex: {
      flexCenter: string;
      flexCenterColumn: string;
    };
  }
}
