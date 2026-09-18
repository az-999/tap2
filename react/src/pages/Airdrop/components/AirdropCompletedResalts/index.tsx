import { observer } from 'mobx-react-lite';
import React from 'react';
import { css } from 'styled-components/macro';
import Swal from 'sweetalert2';

import CloseButton from '@/components/CloseButton';
import Text from '@/components/UI/Text';

import AirdropIcon from '@/pages/Airdrop/assets/AirdropIcon';
import BumpTokenIcon from '@/pages/Airdrop/assets/BumpTokenIcon';
import UserIcon from '@/pages/Airdrop/assets/UserIcon';
import {
  AirdropCompletedResaltsContainer,
  CollCell,
  InnerContainer,
} from '@/pages/Airdrop/components/AirdropCompletedResalts/styled';
import rootStore from '@/store';

const AirdropCompletedResalts = ({
  isWithTitle = false,
}: {
  isWithTitle?: boolean;
}) => {
  const {
    airdropStore: { airdropCompletedData },
  } = rootStore;

  return (
    <AirdropCompletedResaltsContainer>
      <InnerContainer>
        {isWithTitle && (
          <>
            <Text
              fontSize={12}
              fontWeight={500}
              styledFragment={css`
                width: fit-content;
              `}
            >
              Your season achievements
            </Text>
            <CloseButton onClick={() => Swal.close()} />
          </>
        )}
        <CollCell>
          <div>
            <div>
              <AirdropIcon />
              <Text fontSize={12} fontWeight={600}>
                {airdropCompletedData?.balance_ap.toLocaleString('ru-RU')}
              </Text>
            </div>

            <Text fontSize={12} fontWeight={500}>
              Airdrop Points
            </Text>
          </div>
        </CollCell>
        <CollCell>
          <div>
            <div>
              <UserIcon />
              <Text fontSize={12} fontWeight={600}>
                {airdropCompletedData?.rating
                  ? airdropCompletedData?.rating.toLocaleString('ru-RU')
                  : '-'}
              </Text>
            </div>

            <Text fontSize={12} fontWeight={500}>
              Rank Position
            </Text>
          </div>
        </CollCell>
        <CollCell>
          <div>
            <div>
              <BumpTokenIcon />
              <Text fontSize={12} fontWeight={600}>
                {parseFloat(
                  airdropCompletedData?.balance_bp.toString() ?? '',
                ).toLocaleString('ru-RU')}
              </Text>
            </div>

            <Text fontSize={12} fontWeight={500}>
              Bump Token
            </Text>
          </div>
        </CollCell>
      </InnerContainer>
    </AirdropCompletedResaltsContainer>
  );
};

export default observer(AirdropCompletedResalts);
