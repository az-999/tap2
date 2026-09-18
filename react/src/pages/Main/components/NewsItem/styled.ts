import styled from 'styled-components/macro';

export const NewsItemContainer = styled.div`
  width: 100%;
  height: 130px;
  border-radius: 10px;
  overflow: hidden;
  background: radial-gradient(
    at calc(-120px) calc(100% + 140px),
    rgba(46, 255, 115, 0.7) 0%,
    #171a1a 60%
  );
  display: flex;

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 14px;

    img {
      width: 28px;
      height: auto;
      object-fit: contain;
    }

    div {
      display: flex;
      flex-direction: column;
      gap: 5px;

      #green {
        color: #2eff73;
      }

      & > span:last-child {
        opacity: 0.7;
      }
    }
  }

  & > img {
    width: auto;
    height: 100%;
    object-fit: contain;
  }
`;
