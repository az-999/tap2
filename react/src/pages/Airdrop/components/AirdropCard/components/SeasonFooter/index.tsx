import { observer } from 'mobx-react-lite';
import React from 'react';

import FooterItem from '@/pages/Airdrop/components/AirdropCard/components/FooterItem';
import { Footer } from '@/pages/Airdrop/components/AirdropCard/styled';
import { SEASON_TASKS_DATA } from '@/pages/Airdrop/const';
import rootStore from '@/store';

const SeasonFooter = () => {
  const {
    airdropStore: { airdropPointsBalance, myRankPosition, taskTokenRank },
  } = rootStore;

  const values: Record<number, number> = {
    0: airdropPointsBalance,
    1: myRankPosition,
    2: taskTokenRank,
  };

  return (
    <Footer>
      {SEASON_TASKS_DATA.map((content, index) => (
        <FooterItem
          key={`synthesis-engine-footer-${index}`}
          value={values[index]}
          {...content}
        />
      ))}
    </Footer>
  );
};

export default observer(SeasonFooter);
