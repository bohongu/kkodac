import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      green: string;
      orange: string;
      lime: string;
      lime3: string;
    };
    flex: {
      flexCenter: string;
      flexCenterColumn: string;
    };
  }
}
