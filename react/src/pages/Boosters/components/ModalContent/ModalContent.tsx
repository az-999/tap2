import React from 'react';
import { css } from 'styled-components/macro';

import Button from '@/components/UI/Button';
import Text from '@/components/UI/Text';

import { ModalContentState } from '@/pages/Boosters';
import ErrorIcon from '@/pages/Boosters/assets/ErrorIcon';
import SuccessIcon from '@/pages/Boosters/assets/SuccessIcon';
import x2 from '@/pages/Boosters/assets/x2.png';
import x3 from '@/pages/Boosters/assets/x3.png';
import x5 from '@/pages/Boosters/assets/x5.png';
import {
  BoosterIcon,
  Content,
  Modal,
} from '@/pages/Boosters/components/ModalContent/Styled';

interface ModalContentProps {
  modalData: ModalContentState;
  onClick: (points: 'x2' | 'x3' | 'x5') => void;
  disabled: boolean;
}

const ModalContent = ({ modalData, onClick, disabled }: ModalContentProps) => {
  const { type, points } = modalData;

  const getIcon = () => {
    switch (points) {
      case 'x2':
        return x2;
      case 'x3':
        return x3;
      case 'x5':
        return x5;
    }
  };

  return (
    <Modal>
      <Text fontSize={16} fontWeight={700}>{`Buy Booster ${points}`}</Text>
      <BoosterIcon src={getIcon()} alt="" rel="preload" />

      {(type === 'error' || type === 'noMoney' || type === 'serverError') && (
        <Content>
          <ErrorIcon />

          {type === 'error' && (
            <Text fontSize={14} fontWeight={600}>
              You already have active BOOST
            </Text>
          )}

          {type === 'serverError' && (
            <Text fontSize={14} fontWeight={600}>
              Data processing error
            </Text>
          )}

          {type === 'noMoney' && (
            <Text fontSize={14} fontWeight={600}>
              You do not have enough money to purchase this BOOST
            </Text>
          )}
        </Content>
      )}

      {type === 'buy' && (
        <Button
          onClick={() => onClick(points)}
          fragment={css`
            box-shadow: none;
            border-radius: 10px;
            margin-top: 20px;
            &:disabled {
              opacity: 0.7;
              box-shadow: none;
              border: none;
              background-color: #3c6;
            }
          `}
          disabled={disabled}
        >
          <Text fontSize={14} fontWeight={600}>
            Buy
          </Text>
        </Button>
      )}

      {type === 'success' && (
        <Content $gap={2}>
          <SuccessIcon />
          <Text fontSize={14} fontWeight={600}>
            Congratulations on your purchase! Your booster is activated!
          </Text>
        </Content>
      )}
    </Modal>
  );
};

export default ModalContent;
