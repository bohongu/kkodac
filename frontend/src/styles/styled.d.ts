import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      textColor: string;
    };
    flex: {
      flexCenter: string;
      flexCenterColumn: string;
    };
  }
}
