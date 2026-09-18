import React, { useEffect, useState } from 'react';

import DeleteNftIcon from '@/pages/Vouchers/Components/VoucherTooltip/assets/DeleteNftIcon';
import SuccessIcon from '@/pages/Vouchers/Components/VoucherTooltip/assets/SuccessIcon';
import { NewNftTooltipContainer } from '@/pages/Vouchers/Components/VoucherTooltip/styled';
import { VoucherAndNftTooltipItem } from '@/pages/Vouchers/types';

interface VoucherTooltipProps {
  index: number;
  removeTooltip: (index: number) => void;
  data: VoucherAndNftTooltipItem;
}

const VoucherTooltip = ({
  index,
  removeTooltip,
  data,
}: VoucherTooltipProps) => {
  const [isActive, setIsActive] = useState(false);

  const { type, title } = data;

  useEffect(() => {
    // Показываем тултип через 100 мс
    const timer = setTimeout(() => {
      setIsActive(true);
    }, 100);

    // Скрываем тултип через 5 секунд
    const hideTimer = setTimeout(() => {
      setIsActive(false);

      setTimeout(() => {
        removeTooltip(index);
      }, 500); // Время совпадает с длительностью анимации
    }, 8100); // 500 (задержка показа) + 8000 (время показа)

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <NewNftTooltipContainer
      $index={index}
      $isActive={isActive}
      $isErrorTooltip={type === 'deletedNft'}
      $leftAlign={type === 'extraNftBuy'}
    >
      {type !== 'deletedNft' ? <SuccessIcon /> : <DeleteNftIcon />}

      {type === 'voucherBuy' && (
        <p>
          Congratulations! Your NFT <span>{title}</span> will appear in your
          wallet within a few minutes!
        </p>
      )}

      {type === 'extraNftBuy' && (
        <p>
          Congrats! <span id="green-highlight">5 000 000 000 MMpro Points</span>{' '}
          will be added to your balance! Your NFT <span>{title}</span> will
          appear in your wallet soon!{' '}
        </p>
      )}

      {type === 'nftBuy' && (
        <p>
          The purchase was successfully completed. See NFT <span>{title}</span>{' '}
          in 'My NFTs'!
        </p>
      )}

      {type === 'nftSale' && (
        <p>
          NFT <span>{title}</span> placed for sale
        </p>
      )}

      {type === 'nftWithdraw' && (
        <p>
          NFT <span>{title}</span> withdrawn from sale
        </p>
      )}

      {type === 'deletedNft' && (
        <p>
          There was an issue with <span>{title}</span> NFT purchase as it's a
          duplicate. We had to <span>remove it</span>.{' '}
          <span id="green-highlight">Please choose another</span>
        </p>
      )}
    </NewNftTooltipContainer>
  );
};

export default VoucherTooltip;
