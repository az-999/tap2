import React from 'react';

import FooterItem from '@/pages/Airdrop/components/AirdropCard/components/FooterItem';
import { Footer } from '@/pages/Airdrop/components/AirdropCard/styled';
import { BUMP_FLY_FOOTER_DATA } from '@/pages/Airdrop/const';

const BumpFlyFooter = () => {
  const values: Record<number, number> = {
    0: 1000,
    1: 10,
    2: 1000,
  };

  return (
    <Footer>
      {BUMP_FLY_FOOTER_DATA.map((content, index) => (
        <FooterItem
          key={`synthesis-engine-footer-${index}`}
          value={values[index]}
          {...content}
        />
      ))}
    </Footer>
  );
};

export default BumpFlyFooter;
