import styled, { createGlobalStyle, css } from 'styled-components/macro';

export const bottomBorder = ($isSmallSize?: boolean) => css`
  &:not(:last-child):before {
    position: absolute;
    bottom: ${() => ($isSmallSize ? '-8px' : '-10px')};
    border-bottom: 1px solid #222325;
    width: 100%;
    height: 2px;
    content: '';
  }
`;

export const InformationBlockContainer = styled.div.attrs<
  { $isSmallSize: boolean },
  { $borderRadius: string; $padding: string }
>(({ $isSmallSize }) => ({
  $borderRadius: $isSmallSize ? '8px' : '10px',
  $padding: $isSmallSize ? '16px' : '20px',
}))<{
  $isSmallSize: boolean;
}>`
  border-radius: ${({ $borderRadius }) => $borderRadius};
  padding: ${({ $padding }) => $padding};
  width: 100%;
  border: 1px solid #222325;
  background: #131314;
  display: flex;
  flex-direction: column;
  gap: 20px;

  #strong {
    font-weight: 600;
  }

  #green-strong {
    color: #2eff73;
    font-weight: 600;
  }
`;

export const SwalStyles = createGlobalStyle`
    div:where(.swal2-container) .swal2-html-container {
        padding: 0;
    }

    div:where(.swal2-container) div:where(.swal2-popup) {
        border-radius: 10px;
        background-color: transparent;
        color: transparent;
    }
`;
