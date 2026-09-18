import { createGlobalStyle, css } from 'styled-components/macro';

export const GlobalStyles = createGlobalStyle<{ $initData?: string }>`
    *,
    *::before,
    *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;

        /* Hide scrollbar for IE, Edge and Firefox */
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */

        /* Hide scrollbar for Chrome, Safari and Opera */

        &::-webkit-scrollbar {
            display: none;
        }

        user-select: none; /* Для современных браузеров */
        -webkit-user-select: none; /* Для браузеров на базе WebKit (Chrome, Safari) */
        -moz-user-select: none; /* Для Firefox */
        -ms-user-select: none; /* Для старых версий Internet Explorer */
    }

    body {
        /** изменение положения модального окна кошелька 
        * (если убрать, то уезжает за пределы экрана) */

        ${({ $initData }) =>
          !$initData &&
          css`
            [data-tc-dropdown-container='true'] {
              position: fixed !important;
              top: 70px !important;
              left: calc(100vw - 260px) !important;
            }
          `}
        div:where(.swal2-container) button:where(.swal2-styled).swal2-default-outline:focus {
            box-shadow: none;
        }

        img {
            pointer-events: none;
            -webkit-touch-callout: none; /* Отключает меню при длительном нажатии на изображение */
            -webkit-user-drag: none; /* Отключает перетаскивание изображения */
        }
    }

    /* #root {
         overflow-y: auto;
     }*/

    a {
        text-decoration: none;
    }

    /** стрелки для инпута type='number' */
    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* Firefox */
    input[type=number] {
        -moz-appearance: textfield;
    }

    /* Make clicks pass-through */
    #nprogress {
        pointer-events: none;
    }

    #nprogress .bar {
        background: #29d;

        position: fixed;
        z-index: 1031;
        top: 0;
        left: 0;

        width: 100%;
        height: 2px;
    }

    /* Fancy blur effect */
    #nprogress .peg {
        display: block;
        position: absolute;
        right: 0px;
        width: 100px;
        height: 100%;
        box-shadow: 0 0 10px #29d, 0 0 5px #29d;
        opacity: 1.0;

        -webkit-transform: rotate(3deg) translate(0px, -4px);
        -ms-transform: rotate(3deg) translate(0px, -4px);
        transform: rotate(3deg) translate(0px, -4px);
    }

    /* Remove these to get rid of the spinner */
    #nprogress .spinner {
        display: block;
        position: fixed;
        z-index: 1031;
        top: 15px;
        right: 15px;
    }

    #nprogress .spinner-icon {
        width: 18px;
        height: 18px;
        box-sizing: border-box;

        border: solid 2px transparent;
        border-top-color: #29d;
        border-left-color: #29d;
        border-radius: 50%;

        -webkit-animation: nprogress-spinner 400ms linear infinite;
        animation: nprogress-spinner 400ms linear infinite;
    }

    .nprogress-custom-parent {
        overflow: hidden;
        position: relative;
    }

    .nprogress-custom-parent #nprogress .spinner,
    .nprogress-custom-parent #nprogress .bar {
        position: absolute;
    }

    @-webkit-keyframes nprogress-spinner {
        0% {
            -webkit-transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
        }
    }

    @keyframes nprogress-spinner {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    #nprogress {
        .bar {
            background: green;
            height: 0.25rem;
            z-index: 9999;
        }

        .peg {
            box-shadow: none;
        }
    }
`;
