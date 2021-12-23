import { createGlobalStyle, css } from 'styled-components';
// import normalize from 'normalize.css';
import { breakpoints } from './breakpoints';
// import gridStyles from './gridStyles';
// import tabStyles from './tabStyles';
// import typographyStyles from './typographyStyles';
// import gutenbergStyles from './gutenbergStyles';
// import formStyles from './formStyles';
// import printStyles from './printStyles';

const documentSetup = css`
  :root {
    --font-sans: 'Poppins', system-ui, -apple-system, Segoe UI, Roboto, Ubuntu,
      Cantarell, Noto Sans, sans-serif;
    --font-serif: ui-serif, serif;
    --font-mono: Ubuntu Mono, Dank Mono, Operator Mono, Inconsolata, Fira Mono,
      ui-monospace, SF Mono, Monaco, Droid Sans Mono, Source Code Pro, monospace;

    --white: #fff;

    --gray-0: #f8f9fa;
    --gray-1: #f1f3f5;
    --gray-2: #e9ecef;
    --gray-3: #dee2e6;
    --gray-4: #ced4da;
    --gray-5: #adb5bd;
    --gray-6: #868e96;
    --gray-7: #495057;
    --gray-8: #343a40;
    --gray-9: #212529;

    --radius-1: 2px;
    --radius-2: 5px;
    --radius-3: 1rem;
    --radius-4: 2rem;
    --radius-5: 4rem;
    --radius-6: 8rem;

    --font-size-00: 0.5rem;
    --font-size-0: 0.75rem;
    --font-size-1: 1rem;
    --font-size-2: 1.1rem;
    --font-size-3: 1.25rem;
    --font-size-4: 1.5rem;
    --font-size-5: 2rem;
    --font-size-6: 2.5rem;
    --font-size-7: 3rem;
    --font-size-8: 3.5rem;

    --size-content-1: 20ch;
    --size-content-2: 45ch;
    --size-content-3: 60ch;

    --font-primary: var(--font-sans);
    --color-primary: #5c7cfa;
    --color-primary-tint: #bac8ff;
    --color-primary-shade: #3b5bdb;
    --color-success: #12b886;
    --color-bg: var(--gray-0);
    --color-input-bg: var(--gray-1);
    --color-input-border: var(--gray-5);
    --color-footer-separator: var(--gray-5);
    --box-shadow: 0 3px 6px -3px hsl(0deg 0% 0% / 0.32);
    --box-shadow-2: 0 6px 9px -3px hsl(0deg 0% 0% / 0.32);
    --color-focus: black 0px 0px 0px 2px;
    --transition: 0.25s ease;

    --font-size-small: 0.8rem;
  }

  @media screen {
    body[data-theme='dark'] {
    }
  }

  :is(a, button, input, textarea, summary) {
    --outline-size: max(2px, 0.08em);
    --outline-style: solid;
    --outline-color: var(--color-primary);
    --outline-offset: 0;
  }

  :is(a, button, input, textarea, summary):focus {
    outline: var(--outline-size) var(--outline-style) var(--outline-color);
    outline-offset: var(--outline-offset, var(--outline-size));
  }

  :is(a, button, input, textarea, summary):focus:not(:focus-visible) {
    outline: none;
  }

  html,
  body {
    overflow-x: hidden;
  }

  html {
    &.no-scroll {
      overflow: hidden;

      body {
        overflow: hidden;
      }
    }
  }

  body {
    background: var(--color-bg);

    .site {
      display: flex;
      flex-direction: column;
      min-height: 100vh;

      .site-content {
        flex: 1;
      }
    }
  }
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    /* word-break: break-word;
    word-wrap: break-word; */
  }
  * {
    margin: 0;
  }

  /* @media (hover: hover) {
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
      background-color: var(--color-card-bg);
    }

    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }

    ::-webkit-scrollbar-thumb {
      background-color: var(--color-p);
      border-radius: 3px;

      &:hover {
        background-color: var(--color-accent);
      }
    }
  } */

  img,
  figure {
    max-width: 100%;
  }

  .grecaptcha-badge {
    display: none !important;
  }
`;

const accessibilityStyles = css`
  .visually-hidden {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }

  /* body:not(.is-keyboard) {
    *:focus {
      outline: none;
    }
  } */

  [hidden] {
    display: none !important;
  }
`;

const typographyStyles = css`
  html {
    font-size: 100%; /* 1rem = 16px */
  }

  body {
    color: var(--color-p);
    font-family: var(--font-primary);
    font-size: 1rem;
    color-adjust: economy;
    -webkit-print-color-adjust: economy;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  button,
  .button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
  }

  figure {
    margin: 0;
  }

  canvas {
    display: block;
  }

  code {
    font-family: var(--font-mono);

    &.inline {
      background-color: var(--gray-3);
      padding: 0.125rem 0.5rem;
      border-radius: 0.25rem;
      font-size: 90%;
      line-height: 1.5rem;
    }
  }

  .image-wrapper {
    width: 100%;
  }

  /* Copy & lists */
  p {
    word-break: break-word;
    hyphens: none;
    line-height: 1.5em;
    color: var(--color-p);
    margin: 0;

    &:not(:last-child) {
      margin-bottom: 1.5rem;
    }
  }

  ul,
  ol {
    margin: 0;

    &:not(:last-child) {
      margin-bottom: 1.5em;
    }

    li {
      line-height: 1.5em;
    }

    ul,
    ol {
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  small,
  .small {
    font-size: var(--font-size-small);
  }

  strong {
    font-weight: 700;
  }

  /* Headings */
  h1,
  .h1,
  h2,
  .h2,
  h3,
  .h3,
  h4,
  .h4,
  h5,
  .h5,
  h6,
  .h6 {
    margin-top: 0;
    margin-bottom: 0;
    line-height: 1.35;
    color: var(--color-h);
    font-family: var(--font-primary);
    word-break: break-word;
  }

  h1,
  .h1 {
    font-size: var(--font-size-7);
    font-weight: 700;

    &:not(:last-child) {
      margin-bottom: 0.625em;
    }
  }

  h2,
  .h2 {
    font-size: var(--font-size-h2);
    font-weight: 700;

    &:not(:last-child) {
      margin-bottom: 0.75em;
    }

    p + & {
      margin-top: 2em;
    }
  }

  h3,
  .h3 {
    font-size: var(--font-size-h3);
    font-weight: var(--font-weight-h3);

    &.m-b,
    &:not(:last-child) {
      margin-bottom: 1em;
    }

    p + & {
      margin-top: 2em;
    }
  }

  h4,
  .h4 {
    font-size: var(--font-size-h4);
    font-weight: var(--font-weight-h4);

    &:not(:last-child) {
      margin-bottom: 1em;
    }
  }

  h5,
  .h5 {
    font-size: var(--font-size-h5);
    font-weight: var(--font-weight-h5);
  }

  h6,
  .h6 {
    font-size: var(--font-size-h6);
    font-weight: 600;
  }

  /* Links */
  a {
    text-decoration: none;
    color: var(--color-primary);
    transition: color var(--transition);

    &:hover {
      text-decoration: underline;
    }
  }

  button {
    background: none;
    border: 0;
    cursor: pointer;
    color: inherit;
  }

  /* Image & iframes */

  img,
  iframe,
  video,
  audio {
    max-width: 100%;
  }

  img {
    height: auto;
  }

  .iframe-wrapper {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%;

    iframe {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
    }
  }

  strong {
    font-weight: 600;
  }

  /* blockquote */
  blockquote {
    padding-top: 1em;
    position: relative;

    &:not(:last-child) {
      margin-bottom: var(--p-spacing);
    }
    /* &:not(:first-of-type) {
      margin-top: var(--p-spacing);
    } */

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: calc(50% + 1.25rem);
      height: 1px;
      background-color: var(--color-accent);

      @media ${breakpoints.tabletS} {
        width: calc(100% - 2.5em);
      }
    }

    &.inline {
      max-width: 25rem;

      @media ${breakpoints.mobileL} {
        width: 50%;
      }

      &--right {
        @media ${breakpoints.mobileL} {
          float: right;
          margin-top: 0;
          margin-left: 1rem;
          margin-bottom: var(--p-spacing);
        }

        @media ${breakpoints.laptopS} {
          margin-left: 1.5rem;
        }
      }
    }
    > p {
      font-family: var(--font-primary);
      font-weight: 700;
      font-size: var(--font-size-blockquote);
    }
  }

  /* Utils */
  .box-shadow {
    box-shadow: var(--box-shadow);
  }

  .separator {
    color: var(--light-grey);
  }

  .skeleton-bg {
    background: var(--color-bg-shade);
    position: relative;
    overflow: hidden;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background-image: linear-gradient(
        90deg,
        hsla(var(--color-bg-hsl), 0) 0,
        hsla(var(--color-bg-hsl), 0.25) 30%,
        hsla(var(--color-bg-hsl), 0.5) 60%,
        hsla(var(--color-bg-hsl), 0) 100%
      );
      z-index: 1;
      animation: shimmer 1.5s infinite;
      transform: translateX(-100%);
    }
  }
  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }
`;

const buttonStyles = css`
  .button {
    text-decoration: none;
    position: relative;
    display: inline-flex;
    padding: 0.5rem 1rem;
    border-radius: var(--radius-2);
    border: 1px solid var(--color-primary-shade);
    color: var(--white);
    font-family: var(--font-primary);
    font-weight: 700;
    font-size: 1rem;
    line-height: 1.5;
    background-color: var(--color-primary);
    transition: background-color var(--transition);

    &:hover {
      background-color: var(--color-primary-shade);

      &::after {
        width: calc(100% - 7px);
      }
    }
  }

  button,
  .button {
    &[disabled],
    &.disabled {
      color: var(--light-grey);
      pointer-events: none;

      &::before,
      &::after {
        background-color: var(--light-grey);
      }

      .icon svg {
        color: var(--light-grey);
      }
    }
  }
`;

const spacingStyles = css`
  .section-m-t {
    margin-top: var(--section-spacing);
  }
  .section-m-b {
    margin-bottom: var(--section-spacing);
  }
  .section-p-t {
    padding-top: var(--section-spacing);
  }
  .section-p-b {
    padding-bottom: var(--section-spacing);
  }
`;

const formStyles = css`
  .form-fields {
    display: flex;
    &__inner {
      display: flex;
      flex-flow: wrap;
      margin: -1rem;
    }
  }
  .form-field {
    padding: 1rem;
    flex: 0 0 100%;
    max-width: 100%;

    > label {
      display: flex;
      align-items: center;
    }

    &__label {
      margin-right: 1rem;
      text-align: left;
      font-weight: 600;
    }

    &__input {
      position: relative;
      flex: 1;

      input,
      select {
        width: 100%;
      }
    }

    &__desc {
      position: absolute;
      top: 100%;
      margin-top: 0.125rem;
      width: 100%;
      text-align: right;
      font-size: var(--font-size-small);
    }
  }

  input,
  select,
  textarea {
    background-color: var(--color-input-bg);
    padding: 0.5rem 1rem;
    border-radius: var(--radius-2);
    border: 1px solid var(--color-input-border);
    line-height: 1.5;
  }
`;

const GlobalStyles = createGlobalStyle`
    ${documentSetup}
    ${accessibilityStyles}
    ${spacingStyles}
    ${typographyStyles}
    ${buttonStyles}
    ${formStyles}
  `;

export default GlobalStyles;
