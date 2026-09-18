import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SecureLS from 'secure-ls';
import { css } from 'styled-components/macro';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import Text from '@/components/UI/Text';

import BumpTokenIcon from '@/pages/Airdrop/assets/BumpTokenIcon';
import InfoGreenIcon from '@/pages/Airdrop/assets/InfoGreenIcon';
import topImage from '@/pages/Airdrop/assets/main-page-logo.png';
import {
  AirdropCompletedContainer,
  BalanceContainer,
  ButtonContainer,
  ContentContainer,
  LinksContainer,
} from '@/pages/Airdrop/components/AirdropCompleted/styled';
import AirdropCompletedResalts from '@/pages/Airdrop/components/AirdropCompletedResalts';
import Button from '@/pages/Airdrop/components/Button';
import CongratulationAirdropCompletedPopup from '@/pages/Airdrop/components/CongratulationAirdropCompletedPopup';
import { SwalStyles } from '@/pages/Airdrop/components/InformationBlock/styled';
import { TopLogo } from '@/pages/Airdrop/components/TopBlock/styled';
import { defaultSweetAlertOptions } from '@/pages/Airdrop/sweetAlertOptions';
import rootStore from '@/store';
import { AirdropPath, AppPath } from '@/types/routes';

const ls = new SecureLS();

const AirdropCompleted = () => {
  const navigate = useNavigate();

  const {
    airdropStore: { airdropCompletedData, isUserRatingDefined },
  } = rootStore;

  const handleInfoButtonClick = async () => {
    await withReactContent(Swal).fire({
      ...defaultSweetAlertOptions,
      width: '90vw',
      html: <AirdropCompletedResalts isWithTitle />,
    });
  };

  useEffect(() => {
    if (ls.get('isFirstAirdropCompleted') === true || !isUserRatingDefined)
      return;

    queueMicrotask(
      () =>
        void withReactContent(Swal).fire({
          ...defaultSweetAlertOptions,
          width: '90vw',
          html: <CongratulationAirdropCompletedPopup navigate={navigate} />,
        }),
    );
  }, []);

  return (
    <AirdropCompletedContainer>
      <SwalStyles />
      <TopLogo src={topImage} alt="" />

      <ContentContainer>
        <Text
          fontSize={20}
          fontWeight={600}
          styledFragment={css`
            max-width: 220px;
            line-height: 24px;
          `}
        >
          Results of the First Airdrop Season
        </Text>

        <BalanceContainer>
          <Text
            fontSize={12}
            fontWeight={500}
            styledFragment={css`
              max-width: 150px;
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
        </BalanceContainer>

        <ButtonContainer>
          <Button title="Claim Bump Token" disabled size="regular" />
          <div>
            <InfoGreenIcon />
            <Text fontSize={12} fontWeight={500}>
              To be activated before listing
            </Text>
          </div>
        </ButtonContainer>

        <LinksContainer>
          <Button
            title="Rating"
            buttonType="outlined"
            size="regular"
            withShadow={false}
            onClick={() =>
              navigate(`${AppPath.airdrop}/${AirdropPath.airdropRating}`)
            }
          />
          <Button
            title="Your season achievements"
            buttonType="outlined"
            size="regular"
            withShadow={false}
            onClick={handleInfoButtonClick}
          />
        </LinksContainer>
      </ContentContainer>
    </AirdropCompletedContainer>
  );
};

export default observer(AirdropCompleted);
