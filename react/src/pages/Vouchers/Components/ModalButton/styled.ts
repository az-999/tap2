import styled from 'styled-components/macro';

export const ModalButtonContainer = styled.button`
  width: calc(100% - 20px);
  height: 50px;
  border-radius: 10px;
  background: #3c6;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 0;
  color: #fff;
  margin: 12px 10px 0;
  -webkit-tap-highlight-color: transparent;

  &:focus {
    outline: none;
  }
`;
