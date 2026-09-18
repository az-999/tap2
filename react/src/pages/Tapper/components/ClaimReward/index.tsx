import { observer } from 'mobx-react-lite';
import React, { useMemo } from 'react';
import SecureLS from 'secure-ls';

import { ClaimBalance, ClaimTextWrapper, Icon, Text } from './styled';
import Utils from '@/utils';

const ls = new SecureLS();

const ClaimReward = ({
  userInfo,
  farmLimit,
  tapCount,
}: {
  userInfo: any;
  farmLimit: number;
  tapCount: number;
}) => {
  const claimResult = useMemo(() => {
    const boost =
      (userInfo.info?.boost && Number(userInfo.info.boost.replace('x', ''))) ||
      1;
    const tapCounter = tapCount || Number(ls.get('tapCountSecure'));
    const farmLimiter = farmLimit * boost;

    return Utils.formatNumber(farmLimiter + tapCounter || 0);
  }, [farmLimit, tapCount, userInfo.info.boost]);

  return (
    <ClaimTextWrapper>
      <ClaimBalance>
        <Icon />
        {claimResult}
      </ClaimBalance>
      <Text>Claim Reward</Text>
    </ClaimTextWrapper>
  );
};

export default observer(ClaimReward);
