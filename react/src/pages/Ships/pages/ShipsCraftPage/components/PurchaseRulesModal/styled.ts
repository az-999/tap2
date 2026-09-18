import styled from 'styled-components/macro';

export const ModalContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  font-family: 'SF Pro Display', sans-serif;
  color: #fff;
  padding: 0 20px 36px;

  h5 {
    font-weight: 700;
    font-size: 16px;
    line-height: 32px;
  }

  p {
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
    text-align: center;
  }

  #craft-modal-title {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
  }
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  min-width: 40px;
  width: fit-content;
  border-radius: 10px;
  background: #222325;
  font-size: 14px;
  padding: 8px;

  p {
    font-weight: 500;

    span {
      color: #3c6;
    }
  }
`;
