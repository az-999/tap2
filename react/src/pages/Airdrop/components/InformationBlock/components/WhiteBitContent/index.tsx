import React from 'react';
import { css } from 'styled-components/macro';

import Text from '@/components/UI/Text';

import CoinIcon from '@/pages/Airdrop/assets/CoinIcon';
import FileIcon from '@/pages/Airdrop/assets/FileIcon';
import TimeIcon from '@/pages/Airdrop/assets/TimeIcon';
import {
  RowCell,
  WhiteBitContentContainer,
} from '@/pages/Airdrop/components/InformationBlock/components/WhiteBitContent/styled';
import { SwalStyles } from '@/pages/Airdrop/components/InformationBlock/styled';

const WhiteBitContent = () => {
  return (
    <WhiteBitContentContainer>
      <SwalStyles />
      <RowCell>
        <FileIcon />
        <Text
          fontSize={12}
          fontWeight={400}
          styledFragment={css`
            line-height: 16px;
          `}
        >
          Familiarize yourself with the{' '}
          <a href="https://t.me/marketmakingpro/1518" target="_blank">
            event terms
          </a>{' '}
          before proceeding.
        </Text>
      </RowCell>

      <RowCell>
        <TimeIcon />
        <Text
          fontSize={12}
          fontWeight={400}
          styledFragment={css`
            line-height: 16px;
          `}
        >
          Task verification is updated <strong>every 7 days.</strong>
        </Text>
      </RowCell>

      <RowCell>
        <CoinIcon />
        <Text
          fontSize={12}
          fontWeight={400}
          styledFragment={css`
            line-height: 16px;
          `}
        >
          Completing the first event level guarantees bonus points,{' '}
          <strong>
            while higher levels offer additional rewards from BUMP and WhiteBIT.
          </strong>
        </Text>
      </RowCell>
    </WhiteBitContentContainer>
  );
};

export default WhiteBitContent;
