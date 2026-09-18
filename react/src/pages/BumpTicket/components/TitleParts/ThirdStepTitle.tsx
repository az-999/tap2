import React from 'react';

import Text from '@/components/UI/Text';

import TimeIcon from '@/pages/BumpTicket/assets/TimeIcon';
import thirdTitleImage from '@/pages/BumpTicket/assets/thirdImg.png';
import { Count, Description, TicketContainer } from '@/pages/BumpTicket/styled';

const ThirdStepTitle = () => {
  return (
    <>
      <div id="third-bump-ticket-img">
        <img src={thirdTitleImage} alt="" id="third-bump-ticket-img" />
      </div>

      <TicketContainer $type="bump">
        <div>
          <TimeIcon />
          <Text fontSize={12} fontWeight={500}>
            Time until BUMP
          </Text>
        </div>

        <Count>
          <Text fontSize={30} fontWeight={700}>
            09:54
          </Text>
        </Count>

        <Description>
          <div>
            <Text fontSize={10} fontWeight={600}>
              3
            </Text>
          </div>
          <Text fontSize={12} fontWeight={400}>
            <strong>80% of funds</strong> raised will be used for{' '}
            <strong>Bump on the Exchange</strong> and{' '}
            <strong>20% referral rewards</strong>
          </Text>
        </Description>
      </TicketContainer>
    </>
  );
};

export default ThirdStepTitle;
