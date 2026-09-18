import styled from 'styled-components/macro';

export const CrossShipContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 12px;
  gap: 10px;
  align-items: center;
`;

export const ButtonInfo = styled.button`
  width: 28px;
  height: 28px;
  border: none;
  background: none;
  -webkit-tap-highlight-color: transparent;

  #lootbox-craft-info {
    width: 100%;
    height: 100%;
  }
`;

export const CrossButton = styled.button`
  width: 100%;
  background: linear-gradient(
    87deg,
    #3c6 -0.52%,
    #35d86b 22.93%,
    #1ebc8d 48.96%,
    #9b33cc 100.56%
  );
  border: none;
  height: 54px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  -webkit-tap-highlight-color: transparent;

  &:focus {
    outline: none;
  }

  div {
    display: flex;
    align-items: center;
    border-radius: 10px 0 0 10px;
    background: #ffffff26;
    padding: 6px;
    width: fit-content;
    height: 100%;
  }

  div:nth-of-type(2) {
    justify-content: center;
    background: transparent;
    width: 100%;
  }
`;
