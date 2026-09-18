import {
  useTonConnectModal,
  useTonConnectUI,
  useTonWallet,
} from '@tonconnect/ui-react';
import { observer } from 'mobx-react-lite';
import createAdHandler from 'monetag-tg-sdk';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import SecureLS from 'secure-ls';
import { css } from 'styled-components/macro';

import Text from '@/components/UI/Text';

import CheckStatusIcon from '@/pages/Tasks/sections/assets/partners/CheckStatusIcon';
import GreenPlayIcon from '@/pages/Tasks/sections/assets/partners/GreenPlayIcon';
import LinkIcon from '@/pages/Tasks/sections/assets/partners/LinkIcon';
import TonkeeperTaskIcon from '@/pages/Tasks/sections/assets/partners/TonkeeperTaskIcon';
import ModalButton from '@/pages/Tasks/sections/pages/TasksPages/ModalButton';
import {
  ModalContentWrapper,
  StyledA,
} from '@/pages/Tasks/sections/pages/TasksPages/ModalContent/styled';
import { Task } from '@/pages/Tasks/types';
import rootStore from '@/store';

interface ModalContentProps {
  task: Task;
  onClick: any;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const ls = new SecureLS();
const adHandler = createAdHandler(9040540);

const ModalContent = ({ task, onClick, setIsModalOpen }: ModalContentProps) => {
  const {
    tasksStore: {
      currentCompletedTask,
      updateCurrentTask,
      isMonetagTaskWatched,
      setIsMonetagTaskWatched,
    },
  } = rootStore;
  const wallet = useTonWallet();
  const { open } = useTonConnectModal();
  const [tonConnectUI] = useTonConnectUI();

  const handleFollowLinkButtonClick = () => {
    updateCurrentTask(task.id);
    ls.set(`isTask${task.id}Exist`, task.id);
  };

  const isTonkeeperTaskCheckButtonDisabled =
    wallet && task.type === 'tonkeeper_wallet'
      ? wallet.device.appName.toLowerCase() !== 'tonkeeper' // если подключен кошелек, но не tonkeeper
      : false;

  const isTonkeeperConnectButtonDisabled =
    wallet?.device.appName.toLowerCase() === 'tonkeeper' || // если подключен tonkeeper кошелек
    task.status !== 'possible' || // или у таски статус, не позволяющий ее больше выполнить
    !task.is_active; // или таска больше не активна (снята с задач)

  const disabledCheckButtonRule =
    (!ls.get(`isTask${task.id}Exist`) && // если таску можно выполнить, но ее нет в LS
      task.status === 'possible' &&
      task.type !== 'tonkeeper_wallet') ||
    task.status !== 'possible' || // или у таски статус, не позволяющий ее больше выполнить
    !task.is_active; // или таска больше не активна (снята с задач)

  const disableTackCheckRules =
    task.design_id === 11
      ? !currentCompletedTask && !isMonetagTaskWatched // или нет в сторе, но мы просмотрели рекламу
      : (!currentCompletedTask &&
          (isTonkeeperTaskCheckButtonDisabled || disabledCheckButtonRule)) || // если нет в сторе активной таски
        (!!currentCompletedTask && currentCompletedTask !== task.id); // или ее id не совпадает c id таски в модалке

  const handleTonkeeperWalletButtonClick = async () => {
    if (wallet) {
      await tonConnectUI.disconnect();
    }

    open();
    setIsModalOpen(false);
    updateCurrentTask(null);
  };

  const handleMonetagTaskWatch = () => {
    adHandler().then(() => setIsMonetagTaskWatched(true));
  };

  useEffect(
    () => () => {
      setIsMonetagTaskWatched(false);
    },
    [],
  );

  return (
    <ModalContentWrapper>
      <Text
        fontSize={16}
        fontWeight={700}
        styledFragment={css`
          text-align: center;
        `}
      >
        {task.name}
      </Text>

      {task.url &&
        task.type !== 'tonkeeper_wallet' &&
        task.design_id !== 11 && (
          <ModalButton>
            <StyledA
              href={task.url}
              target="_blank"
              onClick={handleFollowLinkButtonClick}
            >
              <LinkIcon />
              <Text fontSize={12} fontWeight={500}>
                Follow the link
              </Text>
            </StyledA>
          </ModalButton>
        )}

      {task.design_id === 11 && (
        <ModalButton onClick={handleMonetagTaskWatch}>
          <GreenPlayIcon />
          <Text fontSize={12} fontWeight={500}>
            Watch Ads now
          </Text>
        </ModalButton>
      )}

      {task.type === 'tonkeeper_wallet' && (
        <ModalButton disabled={isTonkeeperConnectButtonDisabled}>
          <StyledA onClick={handleTonkeeperWalletButtonClick}>
            <TonkeeperTaskIcon />
            <Text fontSize={12} fontWeight={500}>
              Connect Tonkeeper wallet
            </Text>
          </StyledA>
        </ModalButton>
      )}

      <ModalButton onClick={onClick} disabled={disableTackCheckRules}>
        <CheckStatusIcon />
        <Text fontSize={12} fontWeight={500}>
          Check completed task
        </Text>
      </ModalButton>
    </ModalContentWrapper>
  );
};

export default observer(ModalContent);
