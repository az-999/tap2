import styled from 'styled-components/macro';

export const UserRatingListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: -20px;
  align-items: center;
`;

export const List = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2px;
  border-radius: 10px;
  border: 1px solid #222325;
  background: #131314;
  padding: 12px;
  max-height: 300px;
  overflow-y: auto;
`;
