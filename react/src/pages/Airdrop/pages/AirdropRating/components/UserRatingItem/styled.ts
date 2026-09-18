import styled from 'styled-components/macro';

export const UserRatingItemContainer = styled.li<{ $isActive: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 10px;
  min-height: 32px;
  padding: ${({ $isActive }) => ($isActive ? '9px 10px 10px' : '6px 10px')};
  border-radius: 8px;
  background-color: ${({ $isActive }) =>
    $isActive ? '#33CC66' : 'transparent'};
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  position: relative;
`;

export const DataWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;

  svg {
    width: 20px;
    height: 20px;
  }
`;
