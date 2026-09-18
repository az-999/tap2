import React from 'react';

import LockIcon from '@/pages/Nfts/assets/LockIcon';
import { StyledButton } from '@/pages/Ships/pages/ShipsCraftPage/components/SubmitButton/styled';

interface SubmitButtonProps {
  title: string;
  isDisabled: boolean;
  isWalletInvalid: boolean;
  onClick: () => void;
  isFullWidth?: boolean;
}

const SubmitButton = ({
  title,
  isDisabled,
  isWalletInvalid,
  onClick,
  isFullWidth = true,
}: SubmitButtonProps) => {
  return (
    <StyledButton
      disabled={isDisabled}
      onClick={onClick}
      $isFullWidth={isFullWidth}
      $isDisabled={isDisabled || isWalletInvalid}
    >
      {(isDisabled || isWalletInvalid) && <LockIcon />}
      {title}
    </StyledButton>
  );
};

export default SubmitButton;
