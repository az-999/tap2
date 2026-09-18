import styled, { css } from 'styled-components/macro';

export const RatingContainer = styled.div<{ $isLoading?: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 54px 12px 40px;
  align-items: center;
  gap: 16px;

  ${({ $isLoading }) =>
    $isLoading &&
    css`
      height: 100%;
      flex-grow: 1;
    `}
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 12px;
  width: 210px;
`;

export const UsersWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 7px;
  width: 100%;
  height: 100%;
  justify-content: center;
  flex-grow: 1;
`;
