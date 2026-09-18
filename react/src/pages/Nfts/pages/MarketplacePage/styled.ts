import styled, { css } from 'styled-components/macro';

export const MarketplacePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
  height: 100%;
  width: 100%;
  flex-grow: 1;
`;

export const TopButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 5px;
`;

export const ViewSelectContainer = styled.div`
  display: flex;
  gap: 5px;
`;

export const Label = styled.label`
  display: flex;
  justify-content: center;
  flex-grow: 1;
  border-radius: 10px;
  background: #18181a;
  position: relative;

  svg {
    position: absolute;
    top: 50%;
    left: 8px;
    transform: translateY(-50%);
  }

  input,
  input:before,
  input:after {
    -webkit-user-select: initial;
    -khtml-user-select: initial;
    -moz-user-select: initial;
    -ms-user-select: initial;
    user-select: initial;
  }
`;

export const Input = styled.input`
  width: 100%;
  background-color: transparent;
  border: none;
  margin: 0 10px 0 38px;
  outline: none;
  color: #fff;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: normal;
  font-family: 'SF Pro Display', sans-serif;

  &:focus {
    outline: none;
  }

  &::placeholder {
    opacity: 0.4;
  }
`;

export const StyledButtonWithIcon = styled.button<{
  $isActive?: boolean;
  $noOpacity?: boolean;
}>`
  background-color: ${({ $isActive }) => ($isActive ? '#33CC66' : '#18181A')};
  border: none;
  height: 40px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  -webkit-tap-highlight-color: transparent;

  ${({ $isActive, $noOpacity }) =>
    !$isActive &&
    !$noOpacity &&
    css`
      svg {
        opacity: 0.5;
      }
    `}

  &:focus {
    outline: none;
  }
`;

export const NftsWrapper = styled.div<{ $noNfts: boolean }>`
  justify-content: start;
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 15px 20px;
  align-items: start;

  &:last-child {
    justify-self: start;
  }

  @media screen and (max-width: 340px) {
    justify-content: center;
  }

  @media screen and (max-width: 380px) {
    gap: 10px 12px;
  }

  ${({ $noNfts }) =>
    $noNfts &&
    css`
      align-items: center;
      justify-content: center;
      flex-grow: 1;
    `}
`;

export const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;

export const NoNftsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
  height: 100%;
  gap: 6px;

  span {
    text-align: center;

    &:last-of-type {
      opacity: 0.8;
    }
  }
`;

export const NoContentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  gap: 6px;

  span {
    text-align: center;
  }
`;
