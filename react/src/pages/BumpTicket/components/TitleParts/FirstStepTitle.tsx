import React from 'react';

import Text from '@/components/UI/Text';

import { TYPE } from '@/pages/BumpTicket';
import TicketIcon from '@/pages/BumpTicket/assets/TicketIcon';
import TonCoinIcon from '@/pages/BumpTicket/assets/TonCoinIcon';
import firstTitleImage from '@/pages/BumpTicket/assets/firstTitleImg.png';
import {
  Description,
  PriceContainer,
  TicketContainer,
  TicketsAvailable,
} from '@/pages/BumpTicket/styled';

const AVAILABLE_COUNT = 45;
const TOTAL_COUNT = 100;

const FirstStepTitle = () => {
  return (
    <>
      <div>
        <img src={firstTitleImage} alt="" id="first-bump-ticket-img" />
      </div>

      <TicketContainer>
        <div>
          <TicketIcon />
          <Text fontSize={12} fontWeight={500}>
            Left ticket
          </Text>
        </div>

        <TicketsAvailable>
          <div>
            <Text fontSize={24} fontWeight={600}>
              {AVAILABLE_COUNT}
            </Text>
          </div>
          <Text fontSize={16} fontWeight={600}>
            /
          </Text>
          <div>
            <Text fontSize={24} fontWeight={600}>
              {TOTAL_COUNT}
            </Text>
          </div>
        </TicketsAvailable>

        <Description>
          <div>
            <Text fontSize={10} fontWeight={600}>
              1
            </Text>
          </div>
          <Text fontSize={12} fontWeight={400}>
            Once all tickets have been purchased, the BUMP countdown is
            activated
          </Text>
        </Description>
      </TicketContainer>

      {TYPE === 'available' && (
        <PriceContainer>
          <Text fontSize={12} fontWeight={500}>
            Price
          </Text>
          <div>
            <TonCoinIcon />
            <Text fontSize={24} fontWeight={600}>
              13.76
            </Text>
          </div>
        </PriceContainer>
      )}
    </>
  );
};

export default FirstStepTitle;
