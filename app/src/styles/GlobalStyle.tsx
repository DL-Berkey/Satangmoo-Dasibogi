import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 300;
    font-style: normal;
}

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;

        font-family: Pretendard-Regular;
    }

    input, textarea {
        font-family: Pretendard-Regular;
    }

    button {
        background: none;
        border: 0;

        &:hover {
            cursor: pointer;
        }
    }

    // 기본이 될 화면 사이즈
    #root {
        width: 100vw;
        height: 100vh;

        overflow: scroll;
    }
`;

export default GlobalStyle;
