import React from 'react';

import Text from '@/components/UI/Text';

import { TYPE } from '@/pages/BumpTicket';
import EarningIcon from '@/pages/BumpTicket/assets/ EarningIcon';
import BumpBackground from '@/pages/BumpTicket/assets/BumpBackground';
import BumpTitleBlock from '@/pages/BumpTicket/assets/BumpTitleBlock';
import EarningTransparentIcon from '@/pages/BumpTicket/assets/EarningTransparentIcon';
import EarningWithBgIcon from '@/pages/BumpTicket/assets/EarningWithBgIcon';
import Item from '@/pages/BumpTicket/components/SmartContractVisualization/components/Item';
import {
  BumpTitle,
  SmartContractVisualizationContainer,
  StyledList,
} from '@/pages/BumpTicket/components/SmartContractVisualization/styled';
import { SMART_CONTRACT_STEPS } from '@/pages/BumpTicket/components/const';

const SmartContractVisualization = () => {
  return (
    <SmartContractVisualizationContainer>
      <BumpBackground />

      <BumpTitle>
        <BumpTitleBlock />

        <div>
          <Text fontSize={12} fontWeight={400}>
            Smart
          </Text>
          <Text fontSize={12} fontWeight={400}>
            Contract
          </Text>
        </div>
      </BumpTitle>

      <StyledList>
        {SMART_CONTRACT_STEPS.map((stepTitle, index) => (
          <Item index={index} text={stepTitle} />
        ))}
      </StyledList>

      <EarningIcon />
      {TYPE === 'bump' ? <EarningWithBgIcon /> : <EarningTransparentIcon />}

      <div id="earning-text">
        <Text fontSize={17} fontWeight={600}>
          Earnings
        </Text>
      </div>
    </SmartContractVisualizationContainer>
  );
};

export default SmartContractVisualization;
