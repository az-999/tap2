import styled from 'styled-components/macro';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: space-between;
  width: 100%;
  /* gap: 40px; */
  /* gap: 25px; */
  gap: 12px;
  position: relative;
  color: white;
`;

export const StyledBoosters = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 100%;
  color: white;
  padding: 76px 0 40px;
  overflow: auto;
`;

export const Title = styled.div`
  display: flex;
  gap: 7px;
  align-items: center;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px;
  padding-bottom: 12px;
  position: relative;
  z-index: 10;
`;

export const SubTitle = styled.div`
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  opacity: 0.8;
  padding-bottom: 20px;
`;

export const ModalTitle = styled.div`
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 32px;
`;

export const BoostersList = styled.div`
  padding-top: 46px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px 10px;

  div:last-child {
    grid-column: 1/-1;
  }
`;
