import Sheet from 'react-modal-sheet';
import styled from 'styled-components/macro';

export const CustomSheet = styled(Sheet)<{ $color?: string }>`
  .react-modal-sheet-container {
    border-radius: 10px 10px 0 0 !important;
    background: ${({ $color }) =>
      $color ? `${$color} !important` : '#161718 !important'};
  }
  .react-modal-sheet-drag-indicator {
    border-radius: 2px !important;
    background: #25272c !important;
    width: 21px !important;
    height: 2px !important;
  }
`;
export const Header = styled.div`
  height: 44px;
`;
