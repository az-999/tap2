import React from 'react';

import Text from '@/components/UI/Text';

import { COUNT } from '@/pages/BumpTicket';
import TapsIcon from '@/pages/BumpTicket/TapsIcon';
import CandleIcon from '@/pages/BumpTicket/assets/CandleIcon';
import secTitleImage from '@/pages/BumpTicket/assets/secTitle.png';
import { Count, Description, TicketContainer } from '@/pages/BumpTicket/styled';

const SecondStepTitle = () => {
  const count = COUNT.toLocaleString('ru-RU');

  return (
    <>
      <div>
        <img src={secTitleImage} alt="" id="sec-bump-ticket-img" />
        <CandleIcon />
      </div>

      <TicketContainer>
        <div>
          <TapsIcon />
          <Text fontSize={12} fontWeight={500}>
            Left taps
          </Text>
        </div>

        <Count>
          <Text fontSize={30} fontWeight={700}>
            {count}
          </Text>
        </Count>

        <Description>
          <div>
            <Text fontSize={10} fontWeight={600}>
              2
            </Text>
          </div>
          <Text fontSize={12} fontWeight={400}>
            After <strong>3.000,000,000</strong> taps, ticket holders will
            receive a link to Bump
          </Text>
        </Description>
      </TicketContainer>
    </>
  );
};

export default SecondStepTitle;
