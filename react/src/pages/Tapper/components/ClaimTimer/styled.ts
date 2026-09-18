import styled from 'styled-components/macro';

export const TimerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 45px;
  position: relative;
  background-color: #000000;
  border-radius: 12px;
`;

export const AnimatedBorder = styled.div<{ time: number }>`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  border-radius: 12px;
  background: ${(props) => `conic-gradient(rgba(46, 255, 115, 1) 0 ${props.time}%, transparent ${props.time}% 100%)`};
  transition: all .2s;

  &:before {
    content: '';
    position: absolute;
    inset: 3px;
    background: #000;
    border-radius: 10px;
    z-index: 10;
  }

  &:after {
    content: '';
    position: absolute;
    inset: 2px;
    background: rgba(51, 204, 102, 0.5);
    border-radius: 11px;
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 2px;
  position: relative;
  z-index: 10;
  text-align: center;
`;

export const Text = styled.div`
  color: #fff;
  font-size: 10px;
  font-weight: 500;
  line-height: 1.1;
`;