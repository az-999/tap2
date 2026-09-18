import styled, { keyframes } from 'styled-components/macro';

const rotateIcon = keyframes`
  0% {
    transform: rotate(0deg)
  }
  100% {
    transform: rotate(360deg)
  }
`;

export const ProcessingContentContainer = styled.div`
  padding: 0 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

export const Row = styled.div`
  display: flex;
  gap: 10px;

  svg:is(#processing-icon) {
    animation: ${rotateIcon} 2s linear infinite;
  }

  &:last-of-type {
    align-items: center;

    #green-highlight {
      color: #33cc66;
      font-weight: 900;
    }

    svg {
      flex-shrink: 0;
      width: 36px;
      height: 36px;
    }
  }
`;

export const ContentItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  span:last-of-type {
    opacity: 0.5;
  }
`;

export const Button = styled.button<{ $type: 'cancel' | 'ok' }>`
  height: 50px;
  width: 100%;
  border-radius: 10px;
  background: ${({ $type }) => ($type === 'cancel' ? '#3b4046' : '#33CC66')};
  border: none;
  color: #fff;
  text-align: center;
  font-family: 'SF Pro Display', sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  -webkit-tap-highlight-color: transparent;

  &:focus {
    outline: none;
  }

  &:disabled {
    opacity: 0.65;
  }
`;
