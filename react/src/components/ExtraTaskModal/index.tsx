import { observer } from 'mobx-react-lite';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SecureLS from 'secure-ls';

import {
  Button,
  ContentContainer,
  ExtraTaskModalContainer,
  ModalBackground,
} from '@/components/ExtraTaskModal/styled';
import TooltipPortal from '@/components/TooltipPortal/tooltipPortal';
import Text from '@/components/UI/Text';

import image from '@/pages/Tasks/sections/assets/partners/bull-main-image.png';
import rootStore from '@/store';
import { AppPath, TasksPath } from '@/types/routes';

const ls = new SecureLS();

const ExtraTaskModal = () => {
  const navigate = useNavigate();

  const {
    tasksStore: { isExtraTaskModalVisible, setIsExtraTaskModalVisible },
    appVersionStore: { isNewVersionPopupVisible },
    userStore: { isGrantRewardModalVisible, isWalletInvalidModalVisible },
  } = rootStore;

  const isActive =
    isExtraTaskModalVisible &&
    !isNewVersionPopupVisible &&
    !isGrantRewardModalVisible &&
    !isWalletInvalidModalVisible;

  const goToTask = () => {
    /*todo поменять на нужный id*/
    setIsExtraTaskModalVisible(false);
    ls.set(`isExtraTask${458}Exist`, true);
    ls.set(`isExtraTask${458}InProgress`, true);

    navigate(`${AppPath.tasks}/${TasksPath.kols}`);
  };

  const resetTask = () => {
    /*todo поменять на нужный id*/
    setIsExtraTaskModalVisible(false);
    ls.set(`isExtraTask${458}Exist`, true);
  };

  return (
    <TooltipPortal>
      <ModalBackground $isActive={isActive}>
        <ExtraTaskModalContainer $isActive={isActive}>
          <img src={image} alt="" rel="preload" />
          <ContentContainer>
            <Text fontSize={16} fontWeight={600}>
              Go to BULL RUN APP
            </Text>

            <div>
              <Text fontSize={12} fontWeight={400}>
                Get 500M MMPro points and a chance to win from
              </Text>
              <Text fontSize={12} fontWeight={400}>
                a $30,000 pool!
              </Text>
            </div>

            <div>
              <Button $type="solid" onClick={goToTask}>
                Receive 500M MMPro Points
              </Button>
              <Button $type="transparent" onClick={resetTask}>
                Another time
              </Button>
            </div>
          </ContentContainer>
        </ExtraTaskModalContainer>
      </ModalBackground>
    </TooltipPortal>
  );
};

export default observer(ExtraTaskModal);
