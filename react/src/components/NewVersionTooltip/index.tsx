import { observer } from 'mobx-react-lite';
import React from 'react';

import CloseButton from '@/components/CloseButton';
import NewVersionIcon from '@/components/NewVersionTooltip/assets/NewVersionIcon';
import ChangeLogItem from '@/components/NewVersionTooltip/components/ChangeLogItem';
import {
  FooterText,
  LogContainer,
  LogList,
  NewVersionTooltipContainer,
} from '@/components/NewVersionTooltip/styled';
import TooltipPortal from '@/components/TooltipPortal/tooltipPortal';
import Text from '@/components/UI/Text';

import { useGetMode } from '@/hooks/useGetMode';
import rootStore from '@/store';

const NewVersionTooltip = () => {
  const { isProdMode, isStageMode } = useGetMode();

  const {
    appVersionStore: {
      isReloadPageNeeded,
      version,
      isNewVersionPopupVisible,
      deleteNewVersionModal,
    },
    userStore: { isGrantRewardModalVisible, isWalletInvalidModalVisible },
  } = rootStore;

  const systemMessage =
    "System changes. You may not be able to see it from the outside, but we've gotten better";
  const actualChangeLog = version?.change_log.find(
    (item) => item.version === version?.version,
  );

  return (
    <TooltipPortal>
      <NewVersionTooltipContainer
        $isActive={
          isNewVersionPopupVisible &&
          !isGrantRewardModalVisible &&
          !isWalletInvalidModalVisible
        }
      >
        <CloseButton
          onClick={deleteNewVersionModal}
          color="green"
          top={6}
          right={6}
        />
        <Text fontSize={14} fontWeight={600}>
          {`Update to Version v.${version?.version}`}
        </Text>
        <LogContainer>
          <Text fontSize={12} fontWeight={500}>
            Changelog:
          </Text>
          <LogList>
            {isProdMode || isStageMode ? (
              actualChangeLog && 'update_user' in actualChangeLog ? (
                actualChangeLog?.update_user?.map((changeItem, index) => (
                  <ChangeLogItem
                    index={index}
                    changeItem={changeItem}
                    key={`updateModal-${index}`}
                  />
                ))
              ) : (
                <Text fontSize={12} fontWeight={400}>
                  {systemMessage}
                </Text>
              )
            ) : (
              actualChangeLog?.update?.map((changeItem, index) => (
                <ChangeLogItem
                  index={index}
                  changeItem={changeItem}
                  key={`updateModal-${index}`}
                />
              ))
            )}
          </LogList>
        </LogContainer>

        {isReloadPageNeeded && (
          <FooterText>
            <NewVersionIcon />
            <Text fontSize={12} fontWeight={400}>
              To apply the changes, please
            </Text>
            <Text fontSize={12} fontWeight={400} color="#3C6">
              restart the application
            </Text>
          </FooterText>
        )}
      </NewVersionTooltipContainer>
    </TooltipPortal>
  );
};

export default observer(NewVersionTooltip);
