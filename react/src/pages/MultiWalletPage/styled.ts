import styled, { createGlobalStyle } from 'styled-components/macro';

export const GlobalStyles = createGlobalStyle`
    [data-tc-dropdown-container="true"] {
        left: 50% !important;
        transform: translateX(-50%);
    }
`;

export const MultiWalletPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  color: #fff;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  padding: 1.5rem;
  box-sizing: border-box;

  span {
    text-align: center;
  }

  #highlight-text {
    color: #3c6;
  }

  #ton-connect-button {
    button {
      display: flex;
      justify-content: center;
      border: 1px solid #ffffff7f;

      svg + div {
        align-self: center;
      }
    }
  }
`;

export const IllustrationTop = styled.img`
  position: fixed;
  top: 0;
  width: 100%;
  height: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  object-fit: cover;
  object-position: bottom;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;

    span {
      opacity: 0.8;
    }
  }
`;

export const Subtitle = styled.div`
  display: flex;
  flex-direction: column;
  opacity: 0.8;

  span {
    text-align: center;
  }
`;

export const ButtonContainer = styled.div`
  position: absolute;
  bottom: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 48px;
`;

export const StyledList = styled.ul`
  border-radius: 12px;
  background: #d9d9d91a;
  padding: 13px 15px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: start;
  margin: 0;

  & > span {
    padding-bottom: 5px;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 3px;
    width: 100%;
    max-height: 236px;
    overflow-y: auto;

    /* Hide scrollbar for IE, Edge and Firefox */
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */

    /* Hide scrollbar for Chrome, Safari and Opera */
    &::-webkit-scrollbar {
      display: none;
    }

    li {
      opacity: 0.8;
      font-size: 12px;
      list-style: none;
    }
  }
`;

export const LogoContainer = styled.div`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);

  div {
    display: flex;
    position: absolute;
    top: -12px;
    right: -16px;
    justify-content: center;
    align-items: center;
    border-radius: 2px;
    background: #3c6;
    padding: 3px;
    max-height: 8px;
  }
`;

export const ResponseText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > span:nth-of-type(1) {
    margin-bottom: 8px;
  }

  span:not(:first-child) {
    opacity: 0.8;
  }
`;
