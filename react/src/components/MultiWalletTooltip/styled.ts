import styled, { css } from 'styled-components/macro';

export const MultiWalletTooltipContainer = styled.div<{
  $isActive: boolean;
}>`
  position: fixed;
  opacity: 0;
  transform: translateY(-110%);
  display: flex;
  top: 10px;
  width: calc(100% - 20px);
  border-radius: 10px;
  background: #2e3032;
  box-shadow: 0 0 24px 0 #000;
  color: white;
  padding: 18px 20px;
  margin: 0 10px;
  gap: 20px;
  flex-direction: column;
  justify-content: center;
  transition: all 0.2s ease-in-out;
  z-index: 1000;

  ${({ $isActive }) =>
    $isActive &&
    css`
      transform: translateY(0);
      opacity: 1;
    `}
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  div {
    display: flex;
    flex-direction: column;

    span {
      opacity: 0.8;
    }
  }
`;

export const ContentContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 3px;
  position: relative;

  li {
    opacity: 0.8;
    margin-bottom: -2px;
    font-size: 12px;
    list-style: none;
  }

  &::before {
    position: absolute;
    top: -10px;
    left: -20px;
    border-top: solid 1px #ffffff1a;
    width: calc(100% + 40px);
    height: 2px;
    content: '';
  }
`;
