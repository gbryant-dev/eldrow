import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`

@font-face {
    font-family: 'Roboto Regular';
    src: url(/fonts/Roboto-Regular.ttf) format('truetype');
  }

:root {
    --green: #6aaa64;
    --darkendGreen: #538d4e;
    --yellow: #c9b458;
    --darkendYellow: #b59f3b;
    --lightGray: #d8d8d8;
    --gray: #86888a;
    --darkGray: #939598;
    --white: #fff;
    --black: #212121;
    --orange: #f5793a;
    --blue: #85c0f9;
    font-family: 'Roboto Regular', Helvetica, sans-serif;
    font-size: 16px;
    --header-height: 50px;
    --keyboard-height: 200px;
    --game-max-width: 500px;
    --color-tone-1: #1a1a1b;
    --color-tone-2: #787c7e;
    --color-tone-3: #878a8c;
    --color-tone-4: #d3d6da;
    --color-tone-5: #edeff1;
    --color-tone-6: #f6f7f8;
    --color-tone-7: #ffffff;
    --opacity-50: rgba(255, 255, 255, 0.5);
    --color-present: var(--yellow);
    --color-correct: var(--green);
    --color-absent: var(--color-tone-2);
    --tile-text-color: var(--color-tone-7);
    --key-text-color: var(--color-tone-1);
    --key-evaluated-text-color: var(--color-tone-7);
    --key-bg: var(--color-tone-4);
    --key-bg-present: var(--color-present);
    --key-bg-correct: var(--color-correct);
    --key-bg-absent: var(--color-absent);
    --modal-content-bg: var(--color-tone-7);
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

  body {
    height: 100%;
    font-size: 16px;
    font-family: 'Roboto Regular', Helvetica, sans-serif;
  }

  :focus-visible {
    outline: none;
  }
`

export default GlobalStyle