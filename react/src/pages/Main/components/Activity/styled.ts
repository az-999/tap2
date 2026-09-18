import styled from 'styled-components/macro';

export const ActivityContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;

export const LargeBannersList = styled.ul`
  width: calc(100% + 40px);
  padding: 0 20px;
  margin-left: -20px;
  display: flex;
  gap: 10px;
  overflow-y: auto;
`;

export const BannersList = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px 10px;

  & > li:last-child {
    grid-column: span 2;
  }
`;
