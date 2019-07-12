import { createGlobalStyle } from 'styled-components';
import Background from '../../images/Background.svg';

const GlobalStyle = createGlobalStyle`
    html {
        box-sizing: border-box;
        font-size: 10px;
        font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
    }

    *,
    *::before,
    *::after {
        box-sizing: inherit;
    }

    html,
    body {
        margin: 0;
        padding: 0;
        background: url(${Background});
        background-repeat: no-repeat;
        background-size: cover;
        background-position-x: right;
    }
`;

export default GlobalStyle;
