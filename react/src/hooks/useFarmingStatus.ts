import { useMemo } from 'react';

import rootStore from '@/store';

const useFarmingStatus = () => {
  const {
    tapperStore: { farmingInfo },
  } = rootStore;

  return useMemo(() => {
    const status = farmingInfo.session.status;

    return {
      isAwait: status === 'await',
      isInProgress: status === 'inProgress',
      isFinished: status === 'finished',
      status,
    };
  }, [farmingInfo.session.status]);
};

export default useFarmingStatus;
