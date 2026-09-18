import React, { useCallback } from 'react';

import Text from '@/components/UI/Text';

import LockIcon from '@/pages/BumpTicket/assets/LockIcon';
import ButtonsGroup from '@/pages/BumpTicket/components/ButtonsGroup';
import ExplanationList from '@/pages/BumpTicket/components/ExplanationList/ExplanationList';
import SmartContractVisualization from '@/pages/BumpTicket/components/SmartContractVisualization';
import FirstStepTitle from '@/pages/BumpTicket/components/TitleParts/FirstStepTitle';
import SecondStepTitle from '@/pages/BumpTicket/components/TitleParts/SecondStepTitle';
import ThirdStepTitle from '@/pages/BumpTicket/components/TitleParts/ThirdStepTitle';
import { EXPLANATION_LIST_ITEMS } from '@/pages/BumpTicket/components/const';
import {
  BumpTicketPageContainer,
  Description,
  DetailsContainer,
  TicketContainer,
  TicketsAvailable,
  TitleWrapper,
} from '@/pages/BumpTicket/styled';

export type PageType = 'available' | 'soldOut' | 'taps' | 'bump';
export const TYPE: PageType = 'available';
export const COUNT = 2_000_000;
const TOTAL_COUNT = 3_000_000;

const BumpTicketPage = () => {
  const percentagesOfCount = (COUNT * 100) / TOTAL_COUNT;

  const getButtonTitle = useCallback((type: PageType) => {
    switch (type) {
      case 'available':
        return {
          type,
          content: <>Buy Ticket</>,
        };
      case 'soldOut':
        return { type, content: <>SOLD OUT</> };
      case 'taps':
        return {
          type,
          content: (
            <>
              <LockIcon />
              <span>Link</span>
            </>
          ),
        };
      default:
        return { type, content: <>Link</> };
    }
  }, []); // поставить в депсы TYPE

  return (
    <BumpTicketPageContainer>
      <TitleWrapper>
        <Text fontSize={24} fontWeight={700}>
          BUMP Ticket
        </Text>

        <div>
          <Text
            fontSize={12}
            fontWeight={400}
            color={'rgba(255, 255, 255, .8)'}
          >
            Buy a ticket, unlock tokens,
          </Text>
          <Text
            fontSize={12}
            fontWeight={400}
            color={'rgba(255, 255, 255, .8)'}
          >
            earn with BUMP!
          </Text>
        </div>
      </TitleWrapper>

      <DetailsContainer $type={TYPE} $count={percentagesOfCount}>
        {(TYPE === 'available' || TYPE === 'soldOut') && <FirstStepTitle />}

        {/*{TYPE === 'taps' && <SecondStepTitle />}*/}
        {/*{TYPE === 'bump' && <ThirdStepTitle />}*/}
      </DetailsContainer>

      <ButtonsGroup buttonData={getButtonTitle(TYPE)} />
      <SmartContractVisualization />
      <ExplanationList list={EXPLANATION_LIST_ITEMS} />
    </BumpTicketPageContainer>
  );
};

export default BumpTicketPage;
