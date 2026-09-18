import styled, { css } from 'styled-components/macro';

export const ExplanationListContainer = styled.div<{
  $withPadding: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ $withPadding }) =>
    $withPadding ? '24px 0 18px' : ' 0 0 18px'};
  gap: 14px;
  color: #fff;
  font-family: 'SF Pro Display', sans-serif;
`;

export const StyledExplanationList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const StyledItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

export const Sequence = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #33cc66;
  border-radius: 50%;
  font-size: 12px;
  font-weight: 600;
`;

export const List = styled.ul<{ $withDots: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;

  ${({ $withDots }) =>
    !$withDots &&
    css`
      list-style: none;

      li {
        list-style-type: none;
      }
    `}
`;

export const ListItem = styled.li`
  opacity: 0.8;
  font-size: 12px;
  font-weight: 400;
  text-align: center;
  list-style-type: disc;
  list-style-position: inside;
`;
