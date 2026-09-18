import { observer } from 'mobx-react-lite';
import React from 'react';
import { NavigateFunction } from 'react-router-dom';
import SecureLS from 'secure-ls';
import { css } from 'styled-components/macro';
import Swal from 'sweetalert2';

import Text from '@/components/UI/Text';

import BumpTokenIcon from '@/pages/Airdrop/assets/BumpTokenIcon';
import AirdropCompletedResalts from '@/pages/Airdrop/components/AirdropCompletedResalts';
import Button from '@/pages/Airdrop/components/Button';
import { CongratulationPopupContainer } from '@/pages/Airdrop/components/CongratulationAirdropCompletedPopup/styled';
import rootStore from '@/store';
import { AirdropPath, AppPath } from '@/types/routes';

const ls = new SecureLS();

const CongratulationAirdropCompletedPopup = ({
  navigate,
}: {
  navigate: NavigateFunction;
}) => {
  const {
    airdropStore: { airdropCompletedData },
  } = rootStore;

  const handleCloseBtnClick = () => {
    ls.set('isFirstAirdropCompleted', true);
    Swal.close();
  };

  const handleRatingBtnClick = () => {
    handleCloseBtnClick();
    navigate(`${AppPath.airdrop}/${AirdropPath.airdropRating}`);
  };

  return (
    <CongratulationPopupContainer>
      <div>
        <Text fontSize={20} fontWeight={600}>
          Congratulations!
        </Text>
        <Text fontSize={14} fontWeight={400}>
          The first season has come to an end
        </Text>
      </div>

      <div>
        <Text
          fontSize={12}
          fontWeight={500}
          styledFragment={css`
            max-width: 160px;
          `}
        >
          This season, you earned Bump Tokens
        </Text>

        <div>
          <BumpTokenIcon />
          <Text fontSize={26} fontWeight={700}>
            {parseFloat(
              airdropCompletedData?.balance_bp.toString() ?? '',
            ).toLocaleString('ru-RU')}
          </Text>
        </div>
      </div>

      <div>
        <Text fontSize={12} fontWeight={500}>
          Your season achievements
        </Text>
        <AirdropCompletedResalts />

        <Button title="Okay!" size="regular" onClick={handleCloseBtnClick} />
        <Button
          title="Rating"
          buttonType="outlined"
          size="regular"
          withShadow={false}
          onClick={handleRatingBtnClick}
        />
      </div>
    </CongratulationPopupContainer>
  );
};

export default observer(CongratulationAirdropCompletedPopup);
