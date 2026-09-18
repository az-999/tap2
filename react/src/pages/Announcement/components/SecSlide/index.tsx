import React from 'react';

import DotIcon from '@/pages/Announcement/assets/DotIcon';
import image from '@/pages/Announcement/assets/announcement-12.png';
import imageSec from '@/pages/Announcement/assets/sec-2.png';
import {
  Content,
  Slide,
} from '@/pages/Announcement/components/SecSlide/styled';

const SecSlide = () => {
  return (
    <Slide>
      <h5>How to get a ship?</h5>
      <img src={image} alt="" />

      <Content>
        <ul>
          <li>
            <div>
              <DotIcon />
              <span>Liquidity Lock</span>
            </div>

            <img src={imageSec} alt="" />
            <p>
              Get parts by locking liquidity in Ton tokens, MMPro, and LP
              Ton/USDT, MMPro/Ton. In addition to % for staking and farming, you
              will receive additional rewards.
            </p>
          </li>
          <li>
            <div>
              <DotIcon />
              <span>MMPro Points</span>
            </div>
            <p>
              For your accumulated MMPro Points through purchases in our NFT
              store (coming soon) and in the new BUMP Lootbox game mechanic
              (coming soon).
            </p>
          </li>
        </ul>
      </Content>
    </Slide>
  );
};

export default SecSlide;
