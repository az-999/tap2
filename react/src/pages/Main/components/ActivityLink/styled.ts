import styled from 'styled-components/macro';

export const ActivityLinkContainer = styled.li`
  display: flex;
  border-radius: 10px;
  background: #222325;
  height: 46px;
  position: relative;

  img {
    border-radius: 10px 0 0 10px;
    width: 50%;
    height: 100%;
    object-fit: cover;
  }

  div {
    display: flex;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
    padding: 6px;
  }
`;
