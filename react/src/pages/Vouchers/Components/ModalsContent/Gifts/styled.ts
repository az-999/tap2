import styled from 'styled-components/macro';

export const GiftsContainer = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 10px;
  border: 1px solid #222325;
  background: #131314;
`;

export const GiftItem = styled.li`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 5px;
  height: 52px;
  position: relative;
  padding: 6px;

  &:not(:last-child)::before {
    position: absolute;
    bottom: 0;
    border-bottom: 1px solid #222325;
    width: 100%;
    height: 2px;
    content: '';
  }

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  svg {
    flex-shrink: 0;
  }
`;
