import { observer } from 'mobx-react-lite';
import React from 'react';

import {
  ColonPart,
  LetterPart,
  NumberPart,
  TimeStringContainer,
} from '@/pages/Airdrop/components/taskElements/TasksContent/Special/DailyCheck/components /styled';
import rootStore from '@/store';
import Utils from '@/utils';

const Timer = () => {
  const {
    airdropStore: { dailyTaskTime },
  } = rootStore;

  const timeParts: RegExpMatchArray | [] =
    Utils.formatAirdropDailyTime(dailyTaskTime).match(/(\d+|[:]|[a-zA-Z])/g) ??
    [];

  return (
    <TimeStringContainer>
      {timeParts.map((part, index) =>
        /^\d+$/.test(part) ? (
          <NumberPart key={`${part}-${index}`}>{part}</NumberPart>
        ) : part === ':' ? (
          <ColonPart key={`${part}-${index}`}>{part}</ColonPart>
        ) : (
          <LetterPart key={`${part}-${index}`}>{part}</LetterPart>
        ),
      )}
    </TimeStringContainer>
  );
};

export default observer(Timer);
