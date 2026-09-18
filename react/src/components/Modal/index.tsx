import React, { ReactNode } from 'react';
import Sheet from 'react-modal-sheet';

import CloseButton from '../CloseButton';
import { CustomSheet, Header } from './styled';

interface ModalProps {
  isActive: boolean;
  onClose: () => void;
  children: ReactNode;
  withoutCloseButton?: boolean;
  withoutHeader?: boolean;
  color?: string;
}

const Modal = ({
  isActive,
  onClose,
  children,
  withoutCloseButton = false,
  withoutHeader = false,
  color,
}: ModalProps) => {
  return (
    <CustomSheet
      isOpen={isActive}
      onClose={withoutCloseButton ? () => null : () => onClose()}
      disableDrag={true}
      detent="content-height"
      $color={color}
    >
      <Sheet.Container>
        {!withoutHeader && (
          <Sheet.Header>
            {!withoutCloseButton && (
              <Header>
                <CloseButton onClick={onClose} />
              </Header>
            )}
          </Sheet.Header>
        )}

        <Sheet.Content>{children}</Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop
        onTap={withoutCloseButton ? () => null : () => onClose()}
      />
    </CustomSheet>
  );
};

export default Modal;
