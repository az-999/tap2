import styled from 'styled-components/macro';

export const ButtonsContainer = styled.div`
  position: fixed;
  width: calc(100% - 40px);
  bottom: 100px;
  left: 0;
  display: flex;
  gap: 10px;
  margin: 0 20px 12px;

  & > div {
    width: calc((100% - 50px - 10px) / 2);
  }

  @media screen and (max-width: 360px) {
    bottom: 70px;
    gap: 6px;
    margin-bottom: 8px;
  }
`;

export const BoostBtn = styled.div`
  min-height: 50px;
  background-color: #33cc66;
  border-radius: 10px;
  display: flex;
  flex-grow: 1;
  z-index: 100;
  position: relative;
  padding: 0 8px;

  @media screen and (max-height: 570px) {
    min-height: 40px;
  }
`;

export const BoostBtnLabel = styled.div`
  margin: auto;
  display: flex;
  gap: 5px;
  font-size: 14px;
  font-weight: 600;
  color: white;
  text-wrap: nowrap;

  @media screen and (max-width: 360px) {
    font-size: 13px;
  }
`;

export const VibrateButton = styled.button<{ $isActive: boolean }>`
  min-height: 100%;
  width: 50px;
  border: none;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ $isActive }) => ($isActive ? '#33cc66' : '#232426FF')};
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0.6)};

  @media screen and (max-height: 570px) {
    width: 40px;
  }

  svg {
    width: 24px;
    height: 24px;

    @media screen and (max-height: 570px) {
      width: 20px;
      height: 20px;
    }
  }
`;
