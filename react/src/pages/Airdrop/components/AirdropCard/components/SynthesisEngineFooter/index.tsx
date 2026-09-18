import React from 'react';

import FooterItem from '@/pages/Airdrop/components/AirdropCard/components/FooterItem';
import { Footer } from '@/pages/Airdrop/components/AirdropCard/styled';
import { SYNTHESIS_ENGINE_FOOTER_DATA } from '@/pages/Airdrop/const';

const SynthesisEngineFooter = () => {
  return (
    <Footer>
      {SYNTHESIS_ENGINE_FOOTER_DATA.map((content, index) => (
        <FooterItem key={`synthesis-engine-footer-${index}`} {...content} />
      ))}
    </Footer>
  );
};

export default SynthesisEngineFooter;
