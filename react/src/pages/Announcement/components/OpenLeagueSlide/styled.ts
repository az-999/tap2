import { distance } from 'framer-motion';
import styled from 'styled-components/macro';

export const Slide = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  flex-direction: column;
  border-radius: 24px;
  position: relative;
  font-family: 'SF Pro Display', sans-serif;
`;

export const TopBlock = styled.div`
  flex-grow: 1;
  background: #14192d;
  position: relative;
  display: flex;

  img {
    position: absolute;
    right: 0;
    max-width: 50vw;
    height: 100%;
    object-fit: cover;
    object-position: left;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  padding: 20px 0 20px 20px;

  span {
    text-align: start;
  }

  svg:not(#ton-icon) {
    margin-top: -30px;
    margin-left: -24px;
  }
`;

export const BottomBlock = styled.div`
  padding: 25px 20px 30px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: #15151591;
  overflow-y: auto;

  span {
    text-align: start;
  }
`;
