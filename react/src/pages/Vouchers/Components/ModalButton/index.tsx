import React from 'react';

import { ModalButtonContainer } from '@/pages/Vouchers/Components/ModalButton/styled';

interface ModalButtonProps {
  children: string;
  onClick: () => void;
}

const ModalButton = ({ children, onClick }: ModalButtonProps) => {
  return (
    <ModalButtonContainer onClick={onClick}>{children}</ModalButtonContainer>
  );
};

export default ModalButton;
