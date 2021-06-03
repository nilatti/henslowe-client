import { createGlobalStyle } from "styled-components";
export const GlobalStyles = createGlobalStyle`
  html {
    --color-text-dark: black;
    --color-text-light: #f2fdf7;
    --color-background: #f2fdf7;
    --color-light: #a9cfd0;
    --color-light-disabled: #a9cfd050;
    --color-med: #35aa9a;
    --color-dark: #005a41;
    --color-dark-disabled: #005a4175;
    --color-very-dark: #002b32;

    --cancel-button-background-color: #a9cfd0;
    --cancel-button-border-color: #005a41;
    --cancel-button-color: #005a41;

    background-color: var(--color-background);
    h1 {
      text-align: center;
    }
    hr {
      color: var(--color-light);
    }
  }
`;

//can't set BP vars so here's where we'll document them.
//--breakpoint-phone: 480px;
//--breakpoint-tablet: 769px;
