import { createGlobalStyle } from 'styled-components';
import { Font } from './theme.constants';
import { font } from './theme';

export const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-family: ${font[Font.PRIMARY]};
    height: 100%;
  }
  body, #app {
    height: 100%;
  }
  #app {
    display: flex;
    flex-direction: column;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
`;
