import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      lime: string;
      lime3: string;
      green: string;
    };
    flex: {
      flexCenter: string;
      flexCenterColumn: string;
    };
  }
}
