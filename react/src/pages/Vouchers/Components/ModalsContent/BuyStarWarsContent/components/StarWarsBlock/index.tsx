import {
  useTonAddress,
  useTonConnectModal,
  useTonConnectUI,
  useTonWallet,
} from '@tonconnect/ui-react';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Tooltip } from 'react-tooltip';
import { css } from 'styled-components/macro';

import Text from '@/components/UI/Text';
import WalletIcon from '@/components/WalletPageButton/assets/WalletIcon';

import InfoIcon from '@/pages/Friends/Assets/InfoIcon';
import TonCoinIcon from '@/pages/Vouchers/Components/ModalsContent/BuyStarWarsContent/assets/TonCoinIcon';
import defenseRightDec from '@/pages/Vouchers/Components/ModalsContent/BuyStarWarsContent/assets/defense-dec-1.png';
import defenseLeftDec from '@/pages/Vouchers/Components/ModalsContent/BuyStarWarsContent/assets/defense-dec-2.png';
import defenseBg from '@/pages/Vouchers/Components/ModalsContent/BuyStarWarsContent/assets/defenseBg.png';
import defenseImage from '@/pages/Vouchers/Components/ModalsContent/BuyStarWarsContent/assets/defenseIcon.png';
import pirateLeftDec from '@/pages/Vouchers/Components/ModalsContent/BuyStarWarsContent/assets/pirate-dec-1.png';
import pirateRightDec from '@/pages/Vouchers/Components/ModalsContent/BuyStarWarsContent/assets/pirate-dec-2.png';
import pirateBg from '@/pages/Vouchers/Components/ModalsContent/BuyStarWarsContent/assets/pirateBg.png';
import pirateImage from '@/pages/Vouchers/Components/ModalsContent/BuyStarWarsContent/assets/pirateIcon.png';
import {
  ButtonContainer,
  ContentContainer,
  PriceContainer,
  StarWarsBlockContainer,
  TextContainer,
  TitleContainer,
  TitleImage,
  TooltipRow,
} from '@/pages/Vouchers/Components/ModalsContent/BuyStarWarsContent/styled';
import { ExtraButton } from '@/pages/Vouchers/Components/Voucher/styled';
import { initialVouchersPageModalContentState } from '@/pages/Vouchers/store';
import rootStore from '@/store';

interface StarWarsBlockProps {
  type: 'pirate' | 'defense';
  onModalClose: () => void;
}

const StarWarsBlock = ({ type, onModalClose }: StarWarsBlockProps) => {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonAddress();
  const { open } = useTonConnectModal();

  const {
    shipsStore: { buyPirateOrDefenseMark },
    vouchersStore: { setModalContentActive },
    showWinTooltip,
    isShowWinTooltip,
    isShowInfoTooltip,
  } = rootStore;

  const onButtonClick = async ({ product_id }: { product_id: '1' | '2' }) => {
    if (!wallet) return;

    setModalContentActive(initialVouchersPageModalContentState);
    await buyPirateOrDefenseMark({
      product_id,
      amount: product_id === '1' ? 1 : 0.1,
      tonConnectUI,
      walletAddress: wallet,
    });
  };

  const handleConnectWalletClick = () => {
    open();
    onModalClose();
  };

  return (
    <StarWarsBlockContainer>
      <TitleImage>
        <img src={type === 'pirate' ? pirateBg : defenseBg} alt="" />
        <img src={type === 'pirate' ? pirateImage : defenseImage} alt="" />
      </TitleImage>

      <ContentContainer>
        {type === 'pirate' && (
          <>
            <img src={pirateLeftDec} alt="" id="pirate-left-image" />
            <img src={pirateRightDec} alt="" id="pirate-right-image" />
          </>
        )}

        {type === 'defense' && (
          <>
            <img src={defenseLeftDec} alt="" id="defense-left-image" />
            <img src={defenseRightDec} alt="" id="defense-right-image" />
          </>
        )}

        <TitleContainer>
          <Text fontSize={16} fontWeight={700}>
            {type === 'pirate' ? 'Pirate Mark' : 'Defense Mark'}
          </Text>
          <PriceContainer>
            <Text fontSize={14} fontWeight={500}>
              Price
            </Text>
            <TonCoinIcon />
            <Text fontSize={20} fontWeight={600}>
              {type === 'pirate' ? '1.0' : '0.1'}
            </Text>

            <button
              data-tooltip-id={`info-commission-tooltip-${type}`}
              onClick={() => showWinTooltip(type === 'pirate')}
            >
              <InfoIcon />
            </button>
          </PriceContainer>
          <TextContainer>
            <Text fontSize={12} fontWeight={400}>
              {type === 'pirate'
                ? 'The pirate mark upgrades your ship. Get the mark and send it out to hunt for victims, taking points from other users who couldn’t defend themselves!'
                : "The defense mark upgrades your space base or ship's security system! It lasts for 30 days from purchase, keeping your resources protected the whole time!"}
            </Text>
          </TextContainer>
        </TitleContainer>
        <ButtonContainer>
          {wallet ? (
            <ExtraButton
              $color={type === 'pirate' ? 'red' : 'green'}
              $isDisabled={false}
              $size="big"
              $isFullWidth={true}
              onClick={() =>
                onButtonClick({ product_id: type === 'pirate' ? '1' : '2' })
              }
            >
              {type === 'pirate' ? 'Buy Pirate Mark' : 'Buy Defense Mark'}
            </ExtraButton>
          ) : (
            <ExtraButton
              $color={type === 'pirate' ? 'red' : 'green'}
              $isDisabled={false}
              $size="big"
              $isFullWidth={true}
              onClick={handleConnectWalletClick}
            >
              <span>
                <WalletIcon fill="#fff" />
              </span>
              Connect a wallet
            </ExtraButton>
          )}
        </ButtonContainer>
      </ContentContainer>

      <Tooltip
        id={`info-commission-tooltip-${type}`}
        place="top-start"
        isOpen={type === 'pirate' ? isShowInfoTooltip : isShowWinTooltip}
      >
        <TooltipRow>
          <Text
            fontSize={14}
            fontWeight={400}
            styledFragment={css`
              text-align: center;
            `}
          >
            Fee: ≈0.0024 TON
          </Text>
        </TooltipRow>
      </Tooltip>
    </StarWarsBlockContainer>
  );
};

export default observer(StarWarsBlock);
