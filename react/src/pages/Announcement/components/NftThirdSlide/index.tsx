import React from 'react';

import DotIcon from '@/pages/Announcement/assets/DotIcon';
import image from '@/pages/Announcement/assets/announcement-23.png';
import {
  Content,
  Slide,
} from '@/pages/Announcement/components/NftThirdSlide/styled';

const NftThirdSlide = () => {
  return (
    <Slide>
      <img src={image} alt="" />

      <Content>
        <h5>New "NFT Ship Parts" collection in BUMP Store</h5>

        <ul id="main-list">
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

export default NftThirdSlide;
