import React from 'react';

import DotIcon from '@/pages/Announcement/assets/DotIcon';
import image from '@/pages/Announcement/assets/announcement-11.png';
import {
  Content,
  Slide,
} from '@/pages/Announcement/components/NftFirstSlide/styled';

const NftFirstSlide = () => {
  return (
    <Slide>
      <img src={image} alt="" />

      <Content>
        <h5>Your NFT Spaceship!</h5>

        <ul id="main-list">
          <li>
            <DotIcon />

            <ul id="sec-list">
              <span>Liquidity Lock</span>
              <li>
                Lock liquidity in TON, MMPro, and LP tokens (TON/USDT,
                MMPro/TON)
              </li>
              <li>Earn ship parts as a reward</li>
            </ul>
          </li>
          <li>
            <DotIcon />
            <ul id="sec-list">
              <span>Game Opportunities</span>
              <li>Deploy your ships on expeditions to planetary stations</li>
              <li>Exchange NFTs for Bump tokens and earn MMPro Points</li>
            </ul>
          </li>
          <li>
            <DotIcon />
            <ul id="sec-list">
              <span>Future Benefits</span>
              <li>
                Accumulate MMPro Points for purchases in our NFT store and BUMP
                Lootbox mechanic
              </li>
              <li>
                Upgrade your ship by collecting parts and earn even more
                rewards!
              </li>
            </ul>
          </li>
        </ul>
      </Content>
    </Slide>
  );
};

export default NftFirstSlide;
