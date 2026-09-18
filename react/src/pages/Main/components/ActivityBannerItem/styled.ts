import styled from 'styled-components/macro';

export const ActivityBannerItemContainer = styled.li`
  display: flex;
  border-radius: 10px;
  border: 1px solid rgba(181, 206, 212, 0.3);
  background: #141516;
  height: 80px;
  width: 180px;
  flex-shrink: 0;
  overflow: hidden;

  div {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: center;
    gap: 3px;
    padding: 12px;
  }

  img {
    aspect-ratio: 1;
    width: auto;
    height: 100%;
  }
`;
