import React, { ReactNode } from 'react';

import { PageType } from '@/pages/BumpTicket';
import FriendIcon from '@/pages/BumpTicket/assets/FriendIcon';
import Button from '@/pages/BumpTicket/components/ButtonsGroup/components/Button';
import { ButtonsGroupContainer } from '@/pages/BumpTicket/components/ButtonsGroup/styled';

interface ButtonsGroupProps {
  buttonData: {
    type: PageType;
    content: ReactNode;
  };
}

const ButtonsGroup = ({ buttonData }: ButtonsGroupProps) => {
  const { content, type } = buttonData;

  if (!content && !type) return null;

  return (
    <ButtonsGroupContainer>
      <Button onClick={() => null} type={type}>
        {content}
      </Button>

      <div>
        <Button onClick={() => null} type="invite">
          Referral Program
        </Button>
        <Button onClick={() => null} type="friend">
          <FriendIcon />
          <span>Invite Friends</span>
        </Button>
      </div>
    </ButtonsGroupContainer>
  );
};

export default ButtonsGroup;
