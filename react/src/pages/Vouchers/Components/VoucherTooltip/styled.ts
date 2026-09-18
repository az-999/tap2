import styled, { css } from 'styled-components/macro';

export const NewNftTooltipContainer = styled.div<{
  $index: number;
  $isActive: boolean;
  $isErrorTooltip?: boolean;
  $leftAlign?: boolean;
}>`
  position: fixed;
  transform: translateX(100%);
  top: ${({ $index }) => `${10 + $index * 80}px`};
  width: calc(100% - 20px);
  height: 70px;
  margin: 0 10px;
  border-radius: 10px;
  background: #20252c;
  box-shadow: 0 0 24px 0 #000;
  color: white;
  padding: 18px 24px;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  z-index: 9999999;
  opacity: 0;
  transition:
    transform 0.5s ease-in-out,
    opacity 0.5s ease-in-out;

  ${({ $isErrorTooltip }) =>
    $isErrorTooltip &&
    css`
      height: fit-content;
      min-height: 70px;
      gap: 12px;
      padding: 12px 16px;

      p {
        text-align: start !important;
      }
    `}

  ${({ $isActive }) =>
    $isActive &&
    css`
      transform: translateX(0);
      opacity: 1;
    `}

  p {
    color: #fff;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    text-align: ${({ $leftAlign }) => ($leftAlign ? 'start' : 'center')};

    span {
      font-weight: 600;
    }

    #green-highlight {
      color: #2eff73;
    }
  }

  svg {
    flex-shrink: 0;
  }

  img {
    flex-shrink: 0;
    width: 30px;
    height: 30px;
  }

  @media screen and (max-width: 390px) {
    padding: 8px;
  }
`;
