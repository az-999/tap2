import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import Text from '@/components/UI/Text';

import BumpX2 from '@/pages/Airdrop/assets/BumpX2';
import ChatSmileIcon from '@/pages/Airdrop/assets/ChatSmileIcon';
import ClockIcon from '@/pages/Airdrop/assets/ClockIcon';
import ErrorIcon from '@/pages/Airdrop/assets/ErrorIcon';
import InfoIcon from '@/pages/Airdrop/assets/InfoIcon';
import Button from '@/pages/Airdrop/components/Button';
import InformationBlock from '@/pages/Airdrop/components/InformationBlock';
import WhiteBitContent from '@/pages/Airdrop/components/InformationBlock/components/WhiteBitContent';
import TaskBottomText from '@/pages/Airdrop/components/taskElements/TaskBottomText';
import TaskContentWrapper from '@/pages/Airdrop/components/taskElements/TaskContentWrapper';
import TaskItem from '@/pages/Airdrop/components/taskElements/TaskItem';
import {
  ButtonsContainer,
  Failed,
  FailedContainer,
  Important,
  Input,
  Moderation,
  TaskList,
  WhiteBitContainer,
  X2,
} from '@/pages/Airdrop/components/taskElements/TasksContent/Special/WhiteBit/styled';
import { SUPPORT_URL, TASKS_LIST_SPECIAL } from '@/pages/Airdrop/const';
import { useShowAirdropTaskModal } from '@/pages/Airdrop/hooks/useShowAirdropTaskModal';
import { defaultSweetAlertOptions } from '@/pages/Airdrop/sweetAlertOptions';
import { Task1 } from '@/pages/Airdrop/types';
import rootStore from '@/store';

const WhiteBit = () => {
  const [inputValue, setInputValue] = useState('');
  const [isInputVisible, setIsInputVisible] = useState(false);
  const { showModal } = useShowAirdropTaskModal();
  const WebApp = useWebApp();

  const { type, title, basedReward: reward } = TASKS_LIST_SPECIAL[0];

  const {
    airdropStore: {
      airdropSpecialTasks,
      postWhitebitTask,
      isAirdropTasksAvailable,
      claimWhitebitTask,
    },
    isLoading,
  } = rootStore;

  const whiteBitTaskStatus =
    airdropSpecialTasks && (airdropSpecialTasks[1] as Task1)?.request
      ? (airdropSpecialTasks[1] as Task1).request.status
      : null;

  const handleInfoButtonClick = async () => {
    await withReactContent(Swal).fire({
      ...defaultSweetAlertOptions,
      html: <InformationBlock content={<WhiteBitContent />} size="small" />,
    });
  };

  const sendFormData = async () => {
    await postWhitebitTask({ whitebitNick: inputValue.trim() });
    setInputValue('');
    setIsInputVisible(false);
  };

  const claimTaskReward = async () => {
    const grant = await claimWhitebitTask();

    if (!grant) return;
    await showModal({ type, title, reward: grant });
  };

  const handleSupportClick = () => {
    WebApp.initData
      ? WebApp.openTelegramLink(SUPPORT_URL)
      : window.open(SUPPORT_URL, '_blank');
  };

  return (
    <WhiteBitContainer>
      <TaskContentWrapper type={type}>
        <TaskList>
          <TaskItem type="multiPart" paddingRight="0">
            <Text fontSize={12} fontWeight={700}>
              1. Register
            </Text>
            <Text fontSize={12} fontWeight={400}>
              Use the <span id="strong">referral link:</span>
            </Text>
            <a href="https://whitebit.com/auth?referral=i3v5y7" target="_blank">
              whitebit.com/referral/i3v5y7
            </a>
          </TaskItem>

          <TaskItem type="multiPart" paddingRight="0">
            <Text fontSize={12} fontWeight={700}>
              2. Complete KYC
            </Text>
            <Text fontSize={12} fontWeight={400}>
              Finish the <span id="strong">identity verification</span> process
            </Text>
          </TaskItem>

          <TaskItem type="multiPart" paddingRight="0">
            <Text fontSize={12} fontWeight={700}>
              3. Top up your balance
            </Text>
            <Text fontSize={12} fontWeight={400}>
              Deposit <span id="green">$11</span> into your account
            </Text>
          </TaskItem>

          <TaskItem type="multiPart" paddingRight="0">
            <Text fontSize={12} fontWeight={700}>
              4. Make a trade
            </Text>
            <Text fontSize={12} fontWeight={400}>
              Buy assets in the <span id="green">WBT/USDT</span> spot{' '}
              <span id="green">pair for $11 and sell them</span>
            </Text>
          </TaskItem>

          <TaskItem type="multiPart" paddingRight="0">
            <Text fontSize={12} fontWeight={700}>
              5. Send your exchange nickname
            </Text>
            <Text fontSize={12} fontWeight={400}>
              Send your exchange nickname to{' '}
              <span id="strong">start the task verification</span>
            </Text>
          </TaskItem>

          <ButtonsContainer>
            {((airdropSpecialTasks &&
              !(airdropSpecialTasks[1] as Task1)?.request) ||
              isInputVisible) && (
              <>
                <Input
                  placeholder="Exchange Nickname"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <Button
                  title="Send and start verification"
                  size="tiny"
                  onClick={sendFormData}
                  disabled={
                    !inputValue || isLoading || !isAirdropTasksAvailable
                  }
                />
              </>
            )}

            {whiteBitTaskStatus === 2 && !isInputVisible && (
              <Button
                title="Enter the nickname again"
                size="tiny"
                buttonType="outlined"
                withShadow={false}
                onClick={() => setIsInputVisible(true)}
                disabled={!isAirdropTasksAvailable}
              />
            )}
          </ButtonsContainer>
        </TaskList>
      </TaskContentWrapper>

      <Important onClick={handleInfoButtonClick}>
        <Text fontSize={11} fontWeight={600}>
          Important
        </Text>
        <InfoIcon />
      </Important>

      <X2>
        <BumpX2 />
        <div>
          <Text fontSize={12} fontWeight={600}>
            Extra
            <span>Reward</span>
          </Text>
          <Text fontSize={10} fontWeight={400}>
            Complete this task to <span>earn x2 Bump Tokens</span> for the
            season!
          </Text>
        </div>
      </X2>

      {/** STATUS_CREATED */}
      {whiteBitTaskStatus === 0 && (
        <Moderation>
          <ClockIcon />
          <Text fontSize={12} fontWeight={700}>
            In moderation
          </Text>
        </Moderation>
      )}

      {/** STATUS_SUCCESS */}
      {whiteBitTaskStatus === 1 && (
        <Button
          title="Claim Reward"
          size="tiny"
          isFullWidth={false}
          disabled={isLoading || !isAirdropTasksAvailable}
          onClick={claimTaskReward}
        />
      )}

      {/** STATUS_REJECT */}
      {whiteBitTaskStatus === 2 && (
        <FailedContainer>
          <Failed>
            <ErrorIcon />
            <Text fontSize={12} fontWeight={700}>
              Failed moderation
            </Text>
          </Failed>
          <Button
            title="Support"
            size="tiny"
            icon={<ChatSmileIcon />}
            isFullWidth={false}
            withShadow={false}
            onClick={handleSupportClick}
          />
        </FailedContainer>
      )}

      <TaskBottomText value={reward} />
    </WhiteBitContainer>
  );
};

export default observer(WhiteBit);
