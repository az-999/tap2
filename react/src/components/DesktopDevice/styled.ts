import styled from 'styled-components/macro';

import Mmpro from '@/assets/static/mmpro';

export const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  min-height: 600px;
  z-index: 9999;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;

  div:last-of-type {
    display: flex;
    justify-content: center;
    gap: 12px;

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      background: transparent;

      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
`;

export const Logo = styled(Mmpro)`
  margin-bottom: 20px;
  height: 94px;
  flex-shrink: 0;
`;

export const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 23px;
  text-align: center;
`;

export const QrCode = styled.img`
  width: 100%;
  max-width: 234px;
  height: auto;
  margin-bottom: 30px;
`;

export const QrCodeSvg = styled.div`
  width: 100%;
  max-width: 234px;
  height: auto;
  margin-bottom: 30px;

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const Link = styled.a`
  color: #fff;
  font-size: 20px;
  line-height: 20px;
`;
