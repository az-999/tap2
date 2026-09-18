import { observer } from 'mobx-react-lite';
import React from 'react';

import Text from '@/components/UI/Text';

import { NftMarketplace } from '@/pages/Nfts/types';
import MmproIcon from '@/pages/Ships/pages/DefensePage/assets/MmproIcon';
import LevelIcon from '@/pages/Ships/pages/PiratePage/assets/LevelIcon';
import {
  BalanceContainer,
  BalanceFieldContainer,
  LevelContainer,
} from '@/pages/Ships/pages/PiratePage/components/BalanceField/styled';
import rootStore from '@/store';

interface BalanceFieldProps {
  type: 'points' | 'reward';
}

const BalanceField = ({ type }: BalanceFieldProps) => {
  const {
    shipsStore: { piracyAllTimePoints, piracyMissionReward, shipNfts },
  } = rootStore;

  if (!shipNfts) return null;

  const sortedShipsByLevel = shipNfts
    .filter((ship) => Boolean((ship as NftMarketplace)?.ship_level))
    ?.sort(
      (a, b) =>
        +(b as NftMarketplace).ship_level! - +(a as NftMarketplace).ship_level!,
    )?.[0];
  const maxShipLevel =
    (sortedShipsByLevel as NftMarketplace)?.ship_level ?? '1';

  return (
    <BalanceFieldContainer>
      <Text fontSize={11} fontWeight={600}>
        {type === 'points' ? 'Points all time' : 'Mission reward'}

        {type === 'reward' && (
          <LevelContainer>
            <LevelIcon />
            <Text fontSize={10} fontWeight={700}>
              {maxShipLevel}
            </Text>
          </LevelContainer>
        )}
      </Text>

      <BalanceContainer>
        <MmproIcon />
        <Text fontSize={14} fontWeight={700}>
          {type === 'points'
            ? piracyAllTimePoints.toLocaleString('ru-RU')
            : piracyMissionReward.toLocaleString('ru-RU')}
        </Text>
      </BalanceContainer>
    </BalanceFieldContainer>
  );
};

export default observer(BalanceField);
