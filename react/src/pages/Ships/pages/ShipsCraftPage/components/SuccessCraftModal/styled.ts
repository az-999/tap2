import styled from 'styled-components/macro';

export const SuccessCraftModalContainer = styled.div`
  padding: 24px 10px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-radius: 10px 10px 0 0;
  background: linear-gradient(
    160deg,
    #0d0e0f 6.04%,
    #1ebc8d 47.33%,
    #9b33cc 77.69%
  );
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: center;
  justify-content: center;
  text-align: center;

  div {
    display: flex;
    flex-direction: column;
    opacity: 0.8;
    text-align: center;
  }
`;

export const EntireCraftedItemContainer = styled.div`
  width: 100%;
  padding: 0 16px;
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 10px;
  background: #3c6;
  width: 100%;
  height: 50px;
  color: #fff;
  font-weight: 600;
  font-size: 14px;
  font-family: 'SF Pro Display', sans-serif;
  -webkit-tap-highlight-color: transparent;

  &:disabled {
    opacity: 0.5;
  }
`;
