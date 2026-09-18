import Sheet from 'react-modal-sheet';
import styled, { keyframes } from 'styled-components';

const slideUpWithFadeCopiedAnimation = keyframes`
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const CustomSheet = styled(Sheet)`
  .react-modal-sheet-header {
    height: 40px;
  }
  .react-modal-sheet-container {
    border-radius: 10px 10px 0 0 !important;
    background: #161718 !important;
  }
  .react-modal-sheet-drag-indicator {
    border-radius: 2px !important;
    background: #25272c !important;
    width: 21px !important;
    height: 2px !important;
  }
`;
export const Header = styled.div`
  height: 40px;
`;
export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;
  padding-bottom: 20px;
`;
export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  padding: 0 20px;
`;
export const InviteButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 109px;
  gap: 5px;
  border-radius: 10px;
  background: #25272c;
  width: 100%;
  height: 50px;
  overflow: hidden;
  position: relative;
`;

export const CopiedMessage = styled.div<{ isActive: boolean }>`
  animation: ${slideUpWithFadeCopiedAnimation} 0.5s forwards;
  opacity: ${(props) => (props.isActive ? 1 : 0)};
  transition: opacity 0.3s ease;
`;
