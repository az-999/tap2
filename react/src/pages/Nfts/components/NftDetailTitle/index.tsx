import { useTonAddress } from '@tonconnect/ui-react';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Tooltip } from 'react-tooltip';
import { css } from 'styled-components/macro';

import Text from '@/components/UI/Text';

import InfoIcon from '@/pages/Nfts/assets/InfoIcon';
import TonCoinIcon from '@/pages/Nfts/assets/TonCoinIcon';
import ShipLevel from '@/pages/Nfts/components/MyNftItem/assets/ShipLevel';
import {
  InfoFeeItemContainer,
  InfoItemContainer,
  NftDetailTitleContainer,
  Sale,
  TooltipRow,
} from '@/pages/Nfts/components/NftDetailTitle/styled';
import rootStore from '@/store';

export interface NftDetailTitleProps {
  type?: 'default' | 'buy' | 'withdraw';
}

const NftDetailTitle = ({ type = 'default' }: NftDetailTitleProps) => {
  const {
    nftsStore: { activeNft, addNftImageTooltipVisible },
    showWinTooltip,
    isShowInfoTooltip,
  } = rootStore;
  const wallet = useTonAddress();

  if (!activeNft) return null;

  const { image, name, sale_price, status, owner, sale, ship_level } =
    activeNft;
  const isSaleActive = Boolean(
    (status === 1 && wallet === owner) || sale?.is_sale,
  );

  return (
    <NftDetailTitleContainer $isSaleActive={isSaleActive}>
      <div id="nft-image-container">
        {ship_level && (
          <div id="ship-level-container">
            <ShipLevel />
            <span>{ship_level}</span>
          </div>
        )}
        <img src={image} alt="" onClick={addNftImageTooltipVisible} />
      </div>

      <div>
        {isSaleActive && (
          <Sale>
            <Text fontSize={10} fontWeight={500}>
              On sale
            </Text>
          </Sale>
        )}

        {/*{status === 'moderation' && (
          <Moderation>
            <Text fontSize={10} fontWeight={500}>
              On moderation
            </Text>
          </Moderation>
        )}*/}

        <Text fontSize={14} fontWeight={700}>
          {name}
        </Text>

        {(sale_price || sale?.is_sale) && (
          <InfoItemContainer>
            <Text fontSize={10} fontWeight={500}>
              Price
            </Text>

            <div>
              <TonCoinIcon />
              <Text fontSize={14} fontWeight={600}>
                {sale_price}
                {sale?.sale_price}
              </Text>
            </div>
          </InfoItemContainer>
        )}

        {type !== 'default' && (
          <InfoFeeItemContainer>
            <div>
              <Text fontSize={10} fontWeight={500}>
                Network Fee
              </Text>
              <button
                id="service-fee-button"
                data-tooltip-id="info-service-fee-tooltip"
                onClick={() => showWinTooltip(true)}
              >
                <InfoIcon />
              </button>
            </div>

            <div>
              <TonCoinIcon />
              <Text fontSize={14} fontWeight={600}>
                {0.3}
              </Text>
            </div>
          </InfoFeeItemContainer>
        )}
      </div>

      <Tooltip
        id="info-service-fee-tooltip"
        place="bottom"
        isOpen={isShowInfoTooltip}
        style={{ width: '70%', zIndex: 2 }}
      >
        <TooltipRow>
          <Text
            fontSize={14}
            fontWeight={400}
            styledFragment={css`
              text-align: center;
            `}
          >
            Most of the commission will be refunded to you after the transaction
            is completed. Please note the change in your balance
          </Text>
        </TooltipRow>
      </Tooltip>
    </NftDetailTitleContainer>
  );
};

export default observer(NftDetailTitle);
