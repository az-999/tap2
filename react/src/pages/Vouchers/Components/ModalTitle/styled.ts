import styled, { css } from 'styled-components/macro';

export const TitleContainer = styled.div<{ $isPriceFieldExist: boolean }>`
  display: flex;
  justify-content: ${({ $isPriceFieldExist }) =>
    $isPriceFieldExist ? 'space-between' : 'center'};
  align-items: center;
  width: 100%;
`;

export const Price = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  p {
    color: #fff;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
  }
`;

export const MMproContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: #fff;

  span {
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
  }

  svg {
    // width: 50px; // todo!!!
    width: 30px;
    height: 30px;
  }

  #success-icon {
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

export const Title = styled.div<{ $disabled: boolean }>`
  display: flex;
  align-items: center;
  gap: 5px;
  color: #fff;

  ${({ $disabled }) =>
    $disabled &&
    css`
      opacity: 0.4;
    `}
`;

export const TonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: #fff;

  span {
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
  }

  svg {
    width: 32px;
    height: 30px;
  }

  #success-icon {
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;
